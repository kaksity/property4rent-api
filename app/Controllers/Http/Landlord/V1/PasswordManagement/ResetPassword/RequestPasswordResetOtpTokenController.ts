import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  REQUEST_RESET_PASSWORD_SUCCESSFUL,
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import { SEND_LANDLORD_ACCOUNT_PASSWORD_RESET_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
import RequestPasswordResetOtpTokenValidator from 'App/Validators/Landlord/V1/PasswordManagement/ResetPassword/RequestPasswordResetOtpTokenValidator'
import businessConfig from 'Config/businessConfig'

export default class RequestPasswordResetOtpTokenController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ request, response }: HttpContextContract) {
    try {
      try {
        await request.validate(RequestPasswordResetOtpTokenValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email } = request.body()

      const landlordTeamMember = await LandlordTeamMemberActions.getLandlordTeamMemberRecord({
        identifierType: 'email',
        identifier: email,
      })

      await OtpTokenActions.revokeOtpTokens(landlordTeamMember!.id)

      const token = generateRandomString({
        charset: 'numeric',
        length: 8,
        isCapitalized: false,
      })

      await OtpTokenActions.createOtpTokenRecord({
        createPayload: {
          authorId: landlordTeamMember!.id,
          purpose: 'reset-password',
          expiresAt: businessConfig.currentDateTime.plus({
            minutes: businessConfig.otpTokenExpirationTimeFrameInMinutes,
          }),
          token,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_LANDLORD_ACCOUNT_PASSWORD_RESET_NOTIFICATION_JOB,
        jobPayload: {
          landlordTeamMemberId: landlordTeamMember!.id,
        },
      })

      return response.created({
        status_code: this.created,
        status: SUCCESS,
        message: REQUEST_RESET_PASSWORD_SUCCESSFUL,
      })
    } catch (RequestPasswordResetOtpTokenControllerError) {
      console.log(
        'RequestPasswordResetOtpTokenController.handle => ',
        RequestPasswordResetOtpTokenControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
