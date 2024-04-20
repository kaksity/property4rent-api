import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import TenantActions from 'App/Actions/TenantActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  TENANT_ACCOUNT_CREATED_SUCCESSFULLY,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import { COMPLETE_TENANT_WALLET_SETUP_JOB } from 'App/Typechecking/JobManagement/FinanceJobTypes'
import {
  SEND_TENANT_ACCOUNT_ACTIVATION_NOTIFICATION_JOB,
  SEND_WELCOME_NEW_TENANT_NOTIFICATION_JOB,
} from 'App/Typechecking/JobManagement/NotificationJobTypes'
import CreateTenantValidator from 'App/Validators/Landlord/V1/TenantManagement/CreateTenantValidator'
import businessConfig from 'Config/businessConfig'

export default class CreateNewTenantController {
  public internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  public unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  public created = HttpStatusCodeEnum.CREATED

  public async handle({ request, auth, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(CreateTenantValidator)
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

      const randomPassword = generateRandomString({
        length: 8,
        charset: 'alphanumeric',
        isCapitalized: false,
      })

      const loggedInLandlord = auth.use('landlordTeamMember').user!

      const tenant = await TenantActions.createTenantRecord({
        createPayload: {
          firstName,
          lastName,
          phoneNumber,
          email,
          password: randomPassword,
          createdByLandlordId: loggedInLandlord.id,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

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

      const mutatedTenantResponsePayload = {
        identifier: tenant.identifier,
        first_name: tenant.firstName,
        last_name: tenant.lastName,
        email: tenant.email,
        phone_number: tenant.phoneNumber,
      }

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_WELCOME_NEW_TENANT_NOTIFICATION_JOB,
        jobPayload: {
          tenantId: tenant.id,
          password: randomPassword,
        },
      })

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
      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: TENANT_ACCOUNT_CREATED_SUCCESSFULLY,
        results: mutatedTenantResponsePayload,
      })
    } catch (CreateNewTenantControllerError) {
      console.log(
        '🚀 ~ CreateNewTenantController.handle CreateNewTenantControllerError ->',
        CreateNewTenantControllerError
      )
      await dbTransaction.rollback()
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
