import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LandlordActions from 'App/Actions/LandlordActions'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  ERROR,
  LANDLORD_ACCOUNT_CREATED_SUCCESSFULLY,
  NOT_APPLICABLE,
  NULL_OBJECT,
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
import { COMPLETE_LANDLORD_WALLET_SETUP_JOB } from 'App/Typechecking/JobManagement/FinanceJobTypes'

export default class CreateNewLandlordController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ request, response, auth }: HttpContextContract) {
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
      } = request.body()

      const mutatedName = mutateOrganizationName(organizationName)

      const landlord = await LandlordActions.createLandlordRecord({
        createPayload: {
          name: organizationName,
          address: organizationAddress,
          mutatedName,
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
        jobIdentifier: COMPLETE_LANDLORD_WALLET_SETUP_JOB,
        jobPayload: {
          landlordId: landlord.id,
        },
      })

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

      const existingLandlordMember = await LandlordTeamMemberActions.getLandlordTeamMemberRecord({
        identifierType: 'id',
        identifier: landlordTeamMember.id,
      })

      if (existingLandlordMember === NULL_OBJECT) {
        return response.internalServerError({
          status: ERROR,
          status_code: this.internalServerError,
          message: SOMETHING_WENT_WRONG,
        })
      }

      const accessToken = await auth.use('landlordTeamMember').login(existingLandlordMember, {
        expiresIn: `${businessConfig.accessTokenExpirationTimeFrameInMinutes} minutes`,
      })

      const mutatedLandlordPayload = {
        identifier: existingLandlordMember.identifier,
        first_name: existingLandlordMember.firstName,
        last_name: existingLandlordMember.lastName,
        email: existingLandlordMember.email,
        phone_number: existingLandlordMember.phoneNumber,
        access_credentials: accessToken,
        meta: {
          created_at: existingLandlordMember.createdAt,
          last_login_date: existingLandlordMember.lastLoginDate ?? NOT_APPLICABLE,
          has_activated_account: existingLandlordMember.hasActivatedAccount,
          is_account_verified: existingLandlordMember.isAccountVerified,
          is_account_locked: existingLandlordMember.isAccountLocked,
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
