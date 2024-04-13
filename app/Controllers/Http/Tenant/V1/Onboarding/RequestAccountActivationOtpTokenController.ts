import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TenantActions from 'App/Actions/TenantActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  REQUEST_ACCOUNT_ACTIVATION_SUCCESSFUL,
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  ACCOUNT_ALREADY_ACTIVATED,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import RequestAccountActivationOtpTokenValidator from 'App/Validators/Tenant/V1/Onboarding/RequestAccountActivationOtpTokenValidator'
import businessConfig from 'Config/businessConfig'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import { SEND_TENANT_ACCOUNT_ACTIVATION_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'

export default class RequestAccountActivationOtpTokenController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ request, response }: HttpContextContract) {
    try {
      try {
        await request.validate(RequestAccountActivationOtpTokenValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email } = request.body()

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'email',
        identifier: email,
      })

      if (tenant!.hasActivatedAccount === 'Yes') {
        return response.ok({
          status: SUCCESS,
          status_code: this.ok,
          message: ACCOUNT_ALREADY_ACTIVATED,
        })
      }

      await OtpTokenActions.revokeOtpTokens(tenant!.id)

      const token = generateRandomString({
        charset: 'numeric',
        length: 8,
        isCapitalized: false,
      })

      await OtpTokenActions.createOtpTokenRecord({
        createPayload: {
          authorId: tenant!.id,
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
        jobIdentifier: SEND_TENANT_ACCOUNT_ACTIVATION_NOTIFICATION_JOB,
        jobPayload: {
          tenantId: tenant!.id,
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
