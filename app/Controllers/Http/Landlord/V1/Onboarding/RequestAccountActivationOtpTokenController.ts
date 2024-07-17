import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  REQUEST_ACCOUNT_ACTIVATION_SUCCESSFUL,
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  ACCOUNT_ALREADY_ACTIVATED,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import { SEND_LANDLORD_ACCOUNT_ACTIVATION_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
import businessConfig from 'Config/businessConfig'

export default class RequestAccountActivationOtpTokenController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ response, auth }: HttpContextContract) {
    try {

      const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

      if (loggedInLandlordTeamMember.hasActivatedAccount === 'Yes') {
        return response.ok({
          status: SUCCESS,
          status_code: this.ok,
          message: ACCOUNT_ALREADY_ACTIVATED,
        })
      }

      await OtpTokenActions.revokeOtpTokens(loggedInLandlordTeamMember.id)

      const token = generateRandomString({
        charset: 'numeric',
        length: 8,
        isCapitalized: false,
      })

      await OtpTokenActions.createOtpTokenRecord({
        createPayload: {
          authorId: loggedInLandlordTeamMember.id,
          purpose: 'account-activation',
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
        jobIdentifier: SEND_LANDLORD_ACCOUNT_ACTIVATION_NOTIFICATION_JOB,
        jobPayload: {
          landlordTeamMemberId: loggedInLandlordTeamMember.id,
        },
      })

      return response.created({
        status_code: this.created,
        status: SUCCESS,
        message: REQUEST_ACCOUNT_ACTIVATION_SUCCESSFUL,
      })
    } catch (RequestAccountActivationOtpTokenControllerError) {
      console.log(
        'RequestAccountActivationOtpTokenController.handle => ',
        RequestAccountActivationOtpTokenControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
