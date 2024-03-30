import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LandlordActions from 'App/Actions/LandlordActions'
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
      } = request.body()

      const landlord = await LandlordActions.createLandlordRecord({
        createPayload: {
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

      await OtpTokenActions.revokeOtpTokens(landlord.id)

      const token = generateRandomString({
        length: 8,
        charset: 'numeric',
      })

      await OtpTokenActions.createOtpTokenRecord({
        createPayload: {
          authorId: landlord.id,
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
          landlordId: landlord.id,
        },
      })

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_LANDLORD_ACCOUNT_ACTIVATION_NOTIFICATION_JOB,
        jobPayload: {
          landlordId: landlord.id,
        },
      })

      const mutatedLandlordPayload = {
        identifier: landlord.identifier,
        first_name: landlord.firstName,
        last_name: landlord.lastName,
        email: landlord.email,
        phone_number: landlord.phoneNumber,
        meta: {
          has_activated_account: landlord.hasActivatedAccount,
          has_verified_account: landlord.isAccountVerified,
          created_at: landlord.createdAt,
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
