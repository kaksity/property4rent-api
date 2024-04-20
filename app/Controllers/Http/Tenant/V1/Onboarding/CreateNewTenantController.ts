import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import TenantActions from 'App/Actions/TenantActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  ERROR,
  TENANT_ACCOUNT_CREATED_SUCCESSFULLY,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import { SEND_TENANT_ACCOUNT_ACTIVATION_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
import CreateNewTenantValidator from 'App/Validators/Tenant/V1/Onboarding/CreateNewTenantValidator'
import businessConfig from 'Config/businessConfig'
import { COMPLETE_TENANT_WALLET_SETUP_JOB } from 'App/Typechecking/JobManagement/FinanceJobTypes'

export default class CreateNewTenantController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ request, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(CreateNewTenantValidator)
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
      } = request.body()

      const tenant = await TenantActions.createTenantRecord({
        createPayload: {
          createdByLandlordId: null,
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await OtpTokenActions.revokeOtpTokens(tenant.id)

      const token = generateRandomString({
        length: 8,
        charset: 'numeric',
      })

      await OtpTokenActions.createOtpTokenRecord({
        createPayload: {
          authorId: tenant.id,
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
        jobIdentifier: SEND_TENANT_ACCOUNT_ACTIVATION_NOTIFICATION_JOB,
        jobPayload: {
          tenantId: tenant.id,
        },
      })

      await QueueClient.addJobToQueue({
        jobIdentifier: COMPLETE_TENANT_WALLET_SETUP_JOB,
        jobPayload: {
          tenantId: tenant.id,
        },
      })

      const mutatedTenantPayload = {
        identifier: tenant.identifier,
        first_name: tenant.firstName,
        last_name: tenant.lastName,
        email: tenant.email,
        phone_number: tenant.phoneNumber,
        meta: {
          has_activated_account: tenant.hasActivatedAccount,
          has_verified_account: tenant.isAccountVerified,
          created_at: tenant.createdAt,
        },
      }

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: TENANT_ACCOUNT_CREATED_SUCCESSFULLY,
        results: mutatedTenantPayload,
      })
    } catch (CreateNewTenantControllerError) {
      await dbTransaction.rollback()
      console.log('CreateNewTenantController.handle => ', CreateNewTenantControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
