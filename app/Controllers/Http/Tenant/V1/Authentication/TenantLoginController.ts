import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TenantActions from 'App/Actions/TenantActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  TENANT_AUTHENTICATION_SUCCESSFUL,
  ERROR,
  INVALID_CREDENTIALS,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  ACCOUNT_IS_LOCKED,
  NOT_APPLICABLE,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import TenantLoginValidator from 'App/Validators/Tenant/V1/Authentication/TenantLoginValidator'
import businessConfig from 'Config/businessConfig'
import Database from '@ioc:Adonis/Lucid/Database'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import { SEND_TENANT_ACCOUNT_ACTIVATION_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'

export default class TenantLoginController {
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private unauthorized = HttpStatusCodeEnum.UNAUTHORIZED
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, response, auth }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(TenantLoginValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email, password } = request.body()

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'email',
        identifier: email,
      })

      const isTenantPasswordValid = await Hash.verify(tenant!.password, password)

      if (isTenantPasswordValid === false) {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: INVALID_CREDENTIALS,
        })
      }

      if (tenant!.hasActivatedAccount === 'No') {
        await OtpTokenActions.revokeOtpTokens(tenant!.id)

        const token = generateRandomString({
          length: 8,
          charset: 'numeric',
        })

        await OtpTokenActions.createOtpTokenRecord({
          createPayload: {
            token,
            authorId: tenant!.id,
            purpose: 'account-activation',
            expiresAt: businessConfig.currentDateTime.plus({
              minutes: businessConfig.otpTokenExpirationTimeFrameInMinutes,
            }),
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
      }

      if (tenant!.isAccountLocked === 'Yes') {
        return response.status(this.unauthorized).json({
          status: ERROR,
          status_code: this.unauthorized,
          message: ACCOUNT_IS_LOCKED,
        })
      }

      await auth.use('tenant').revoke()

      await TenantActions.updateTenantRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: tenant!.id,
        },
        updatePayload: {
          lastLoginDate: businessConfig.currentDateTime,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      const accessToken = await auth.use('tenant').attempt(email, password, {
        expiresIn: `${businessConfig.accessTokenExpirationTimeFrameInMinutes} minutes`,
      })

      const mutatedTenantPayload = {
        identifier: tenant!.identifier,
        first_name: tenant!.firstName,
        last_name: tenant!.lastName,
        email: tenant!.email,
        phone_number: tenant!.phoneNumber,
        access_credentials: accessToken,

        meta: {
          created_at: tenant!.createdAt,
          last_login_date: tenant!.lastLoginDate ?? NOT_APPLICABLE,
          has_activated_account: tenant!.hasActivatedAccount,
          is_account_verified: tenant!.isAccountVerified,
          is_account_locked: tenant!.isAccountLocked,
        },
      }

      return response.ok({
        status_code: this.ok,
        status: SUCCESS,
        message: TENANT_AUTHENTICATION_SUCCESSFUL,
        results: mutatedTenantPayload,
      })
    } catch (TenantLoginControllerError) {
      console.log('TenantLoginController.handle =>', TenantLoginControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
