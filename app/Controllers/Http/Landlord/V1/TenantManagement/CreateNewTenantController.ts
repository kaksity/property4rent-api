import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
import { SEND_WELCOME_NEW_TENANT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
import CreateTenantValidator from 'App/Validators/Landlord/V1/TenantManagement/CreateTenantValidator'

export default class CreateNewTenantController {
  public internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  public unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  public created = HttpStatusCodeEnum.CREATED

  public async handle({ request, response }: HttpContextContract) {
    try {
      try {
        await request.validate(CreateTenantValidator)
      } catch (validationError) {
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

      const tenant = await TenantActions.createTenantRecord({
        createPayload: {
          firstName,
          lastName,
          phoneNumber,
          email,
          password: randomPassword,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

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

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
