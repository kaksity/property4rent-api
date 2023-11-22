import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LandlordActions from 'App/Actions/LandlordActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import {
  ERROR,
  OTP_TOKEN_SUPPLIED_HAS_EXPIRED,
  OTP_TOKEN_SUPPLIED_IS_NOT_VALID,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  VERIFY_RESET_PASSWORD_SUCCESSFUL,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import VerifyPasswordResetOtpTokenValidator from 'App/Validators/Landlord/V1/PasswordManagement/ResetPassword/VerifyPasswordResetOtpTokenValidator'
import businessConfig from 'Config/businessConfig'

export default class VerifyPasswordResetOtpTokenController {
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, response }: HttpContextContract) {
    console.log('Hey')
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(VerifyPasswordResetOtpTokenValidator)
      } catch (validationError) {
        await dbTransaction.rollback()
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email, token, password } = request.body()

      const landlord = await LandlordActions.getLandlordRecord({
        identifierType: 'email',
        identifier: email,
      })

      const otpToken = await OtpTokenActions.getOtpTokenRecord({
        identifierType: 'token',
        identifier: token,
      })

      if (otpToken?.authorId !== landlord?.id) {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: OTP_TOKEN_SUPPLIED_IS_NOT_VALID,
        })
      }

      await OtpTokenActions.deleteOtpTokenRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: otpToken!.id,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      if (otpToken?.purpose !== 'reset-password') {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: OTP_TOKEN_SUPPLIED_IS_NOT_VALID,
        })
      }

      const differenceBetweenCurrentTimestampAndTokenExpiration = otpToken.expiresAt
        .diff(businessConfig.currentDateTime)
        .as('minutes')

      if (differenceBetweenCurrentTimestampAndTokenExpiration <= 0) {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: OTP_TOKEN_SUPPLIED_HAS_EXPIRED,
        })
      }

      await LandlordActions.updateLandlordRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: landlord!.id,
        },
        updatePayload: {
          password,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await dbTransaction.commit()
      return response.ok({
        status_code: this.ok,
        status: SUCCESS,
        message: VERIFY_RESET_PASSWORD_SUCCESSFUL,
      })
    } catch (VerifyPasswordResetOtpTokenControllerError) {
      await dbTransaction.rollback()
      console.log(
        'VerifyPasswordResetOtpTokenController.handle => ',
        VerifyPasswordResetOtpTokenControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
