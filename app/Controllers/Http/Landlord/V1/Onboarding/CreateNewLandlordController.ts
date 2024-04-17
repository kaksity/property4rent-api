import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LandlordActions from 'App/Actions/LandlordActions'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import SubscriptionPlanActions from 'App/Actions/SubscriptionPlanActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  ERROR,
  LANDLORD_ACCOUNT_CREATED_SUCCESSFULLY,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import {
  SEND_LANDLORD_ACCOUNT_ACTIVATION_NOTIFICATION_JOB,
  SEND_WELCOME_NEW_LANDLORD_NOTIFICATION_JOB,
} from 'App/Typechecking/JobManagement/NotificationJobTypes'
import CreateNewLandlordValidator from 'App/Validators/Landlord/V1/Onboarding/CreateNewLandlordValidator'
import businessConfig from 'Config/businessConfig'
import mutateOrganizationName from 'App/Helpers/Functions/mutateOrganizationName'

export default class CreateNewLandlordController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ request, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(CreateNewLandlordValidator)
      } catch (validationError) {
        await dbTransaction.rollback()
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        password,
        organization_name: organizationName,
        organization_address: organizationAddress,
        subscription_plan_identifier: subscriptionPlanIdentifier,
      } = request.body()

      const subscriptionPlan = await SubscriptionPlanActions.getSubscriptionPlanRecord({
        identifierType: 'identifier',
        identifier: subscriptionPlanIdentifier,
      })

      const mutatedName = mutateOrganizationName(organizationName)

      const landlord = await LandlordActions.createLandlordRecord({
        createPayload: {
          name: organizationName,
          address: organizationAddress,
          mutatedName,
          subscriptionPlanId: subscriptionPlan!.id,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      const landlordTeamMember = await LandlordTeamMemberActions.createLandlordTeamMemberRecord({
        createPayload: {
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          landlordId: landlord.id,
          role: 'owner',
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await OtpTokenActions.revokeOtpTokens(landlordTeamMember.id)

      const token = generateRandomString({
        length: 8,
        charset: 'numeric',
      })

      await OtpTokenActions.createOtpTokenRecord({
        createPayload: {
          authorId: landlordTeamMember.id,
          purpose: 'account-activation',
          expiresAt: businessConfig.currentDateTime.plus({
            minutes: businessConfig.otpTokenExpirationTimeFrameInMinutes,
          }),
          token,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await dbTransaction.commit()

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_WELCOME_NEW_LANDLORD_NOTIFICATION_JOB,
        jobPayload: {
          landlordTeamMemberId: landlordTeamMember.id,
        },
      })

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_LANDLORD_ACCOUNT_ACTIVATION_NOTIFICATION_JOB,
        jobPayload: {
          landlordTeamMemberId: landlordTeamMember.id,
        },
      })

      const mutatedLandlordPayload = {
        identifier: landlordTeamMember.identifier,
        first_name: landlordTeamMember.firstName,
        last_name: landlordTeamMember.lastName,
        email: landlordTeamMember.email,
        phone_number: landlordTeamMember.phoneNumber,
        meta: {
          has_activated_account: landlordTeamMember.hasActivatedAccount,
          has_verified_account: landlordTeamMember.isAccountVerified,
          created_at: landlordTeamMember.createdAt,
        },
      }

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: LANDLORD_ACCOUNT_CREATED_SUCCESSFULLY,
        results: mutatedLandlordPayload,
      })
    } catch (CreateNewLandlordControllerError) {
      await dbTransaction.rollback()
      console.log('CreateNewLandlordController.handle => ', CreateNewLandlordControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
