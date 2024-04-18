import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import {
  ERROR,
  OTP_TOKEN_SUPPLIED_HAS_EXPIRED,
  OTP_TOKEN_SUPPLIED_IS_NOT_VALID,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  VERIFY_ACCOUNT_ACTIVATION_SUCCESSFUL,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import VerifyAccountActivationOtpTokenValidator from 'App/Validators/Landlord/V1/Onboarding/VerifyAccountActivationOtpTokenValidator'
import businessConfig from 'Config/businessConfig'

export default class VerifyAccountVerificationOtpTokenController {
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(VerifyAccountActivationOtpTokenValidator)
      } catch (validationError) {
        await dbTransaction.rollback()
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email, token } = request.body()

      const landlordTeamMember = await LandlordTeamMemberActions.getLandlordTeamMemberRecord({
        identifierType: 'email',
        identifier: email,
      })

      const otpToken = await OtpTokenActions.getOtpTokenRecord({
        identifierType: 'token',
        identifier: token,
      })

      if (otpToken?.authorId !== landlordTeamMember?.id) {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: OTP_TOKEN_SUPPLIED_IS_NOT_VALID,
        })
      }

      if (otpToken?.purpose !== 'account-activation') {
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

      await OtpTokenActions.deleteOtpTokenRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: otpToken.id,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await LandlordTeamMemberActions.updateLandlordTeamMemberRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: landlordTeamMember!.id,
        },
        updatePayload: {
          hasActivatedAccount: true,
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
        message: VERIFY_ACCOUNT_ACTIVATION_SUCCESSFUL,
      })
    } catch (VerifyAccountVerificationOtpTokenControllerError) {
      await dbTransaction.rollback()
      console.log(
        'VerifyAccountVerificationOtpTokenController.handle => ',
        VerifyAccountVerificationOtpTokenControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
