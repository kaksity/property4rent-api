import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  ERROR,
  LANDLORD_TEAM_INVITE_SENT_SUCCESSFULLY,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import CreateNewLandlordTeamMemberValidator from 'App/Validators/Landlord/V1/TeamManagement/CreateNewLandlordTeamMemberValidator'
import businessConfig from 'Config/businessConfig'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import { SEND_NEW_LANDLORD_INVITE_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'

export default class CreateNewLandlordTeamMemberController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private created = HttpStatusCodeEnum.CREATED
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, auth, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(CreateNewLandlordTeamMemberValidator)
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
      } = request.body()

      const loggedInTeamMember = auth.use('landlordTeamMember').user!

      const randomPassword = generateRandomString({
        length: 8,
        charset: 'alphabetic',
      })

      const hashedRandomPassword = await Hash.make(randomPassword)

      const landlordTeamMember = await LandlordTeamMemberActions.createLandlordTeamMemberRecord({
        createPayload: {
          firstName,
          lastName,
          phoneNumber,
          email,
          password: hashedRandomPassword,
          landlordId: loggedInTeamMember.landlordId,
          role: 'member',
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

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_NEW_LANDLORD_INVITE_NOTIFICATION_JOB,
        jobPayload: {
          landlordTeamMemberId: landlordTeamMember.id,
          newPassword: randomPassword,
        },
      })

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: LANDLORD_TEAM_INVITE_SENT_SUCCESSFULLY,
        results: mutatedLandlordPayload,
      })
    } catch (CreateNewLandlordTeamMemberControllerError) {
      console.log(
        '🚀 ~ CreateNewLandlordTeamMemberController.handle CreateNewLandlordTeamMemberControllerError ->',
        CreateNewLandlordTeamMemberControllerError
      )

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
