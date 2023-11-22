import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LandlordActions from 'App/Actions/LandlordActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'
import {
  LANDLORD_AUTHENTICATION_SUCCESSFUL,
  ERROR,
  INVALID_CREDENTIALS,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  ACCOUNT_VERIFICATION_IS_REQUIRED,
  ACCOUNT_IS_LOCKED,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import LandlordLoginValidator from 'App/Validators/Landlord/V1/Authentication/LandlordLoginValidator'
import businessConfig from 'Config/businessConfig'

export default class LandlordLoginController {
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private unauthorized = HttpStatusCodeEnum.UNAUTHORIZED
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, response, auth }: HttpContextContract) {
    const dbTransaction = await Database.transaction()

    try {
      try {
        await request.validate(LandlordLoginValidator)
      } catch (validationError) {
        await dbTransaction.rollback()
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email, password } = request.body()

      const landlord = await LandlordActions.getLandlordRecord({
        identifierType: 'email',
        identifier: email,
      })

      const isLandlordPasswordValid = await Hash.verify(landlord!.password, password)

      if (isLandlordPasswordValid === false) {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: INVALID_CREDENTIALS,
        })
      }

      if (landlord!.hasActivatedAccount === 'No') {
        await OtpTokenActions.revokeOtpTokens(landlord!.id)

        const token = generateRandomString({
          length: 8,
          charset: 'numeric',
        })

        await OtpTokenActions.createOtpTokenRecord({
          createPayload: {
            token,
            authorId: landlord!.id,
            purpose: 'account-activation',
            expiresAt: businessConfig.currentDateTime.plus({
              minutes: businessConfig.otpTokenExpirationTimeFrameInMinutes,
            }),
          },
          dbTransactionOptions: {
            useTransaction: true,
            dbTransaction,
          },
        })

        // Send an email notification

        await dbTransaction.commit()
        return response.status(this.unauthorized).json({
          status: ERROR,
          status_code: this.unauthorized,
          message: ACCOUNT_VERIFICATION_IS_REQUIRED,
        })
      }

      if (landlord!.isAccountLocked === 'No') {
        await dbTransaction.commit()
        return response.status(this.unauthorized).json({
          status: ERROR,
          status_code: this.unauthorized,
          message: ACCOUNT_IS_LOCKED,
        })
      }

      await auth.use('landlord').revoke()

      await LandlordActions.updateLandlordRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: landlord!.id
        },
        updatePayload: {
          lastLoginDate: businessConfig.currentDateTime
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction
        }
      })

      const accessToken = await auth.use('landlord').attempt(email, password, {
        expiresIn: `${businessConfig.accessTokenExpirationTimeFrameInMinutes} minutes`,
      })

      const mutatedLandlordPayload = {
        identifier: landlord!.identifier,
        first_name: landlord!.firstName,
        last_name: landlord!.lastName,
        email: landlord!.email,
        phone_number: landlord!.phoneNumber,
        access_credentials: accessToken,
        
        meta: {
          created_at: landlord!.createdAt,
          last_login_date: landlord!.lastLoginDate,
          has_activated_account: landlord!.hasActivatedAccount === true ? 'Yes' : 'No',
          is_account_verified: landlord!.isAccountVerified === true ? 'Yes' : 'No',
          is_account_locked: landlord!.isAccountLocked === true ? 'Yes': 'No'
        }
      }

      await dbTransaction.commit()
      return response.ok({
        status_code: this.ok,
        status: SUCCESS,
        message: LANDLORD_AUTHENTICATION_SUCCESSFUL,
        results: mutatedLandlordPayload,
      })
    } catch (LandlordLoginControllerError) {
      await dbTransaction.rollback()
      console.log('LandlordLoginController.handle =>', LandlordLoginControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
