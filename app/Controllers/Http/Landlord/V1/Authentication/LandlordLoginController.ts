import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
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
  NOT_APPLICABLE,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import { SEND_LANDLORD_ACCOUNT_ACTIVATION_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email, password } = request.body()

      const landlordTeamMember = await LandlordTeamMemberActions.getLandlordTeamMemberRecord({
        identifierType: 'email',
        identifier: email,
      })

      const isLandlordTeamMemberPasswordValid = await Hash.verify(
        landlordTeamMember!.password,
        password
      )

      if (isLandlordTeamMemberPasswordValid === false) {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: INVALID_CREDENTIALS,
        })
      }

      if (landlordTeamMember!.hasActivatedAccount === 'No') {
        await OtpTokenActions.revokeOtpTokens(landlordTeamMember!.id)

        const token = generateRandomString({
          length: 8,
          charset: 'numeric',
        })

        await OtpTokenActions.createOtpTokenRecord({
          createPayload: {
            token,
            authorId: landlordTeamMember!.id,
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
          jobIdentifier: SEND_LANDLORD_ACCOUNT_ACTIVATION_NOTIFICATION_JOB,
          jobPayload: {
            landlordTeamMemberId: landlordTeamMember!.id,
          },
        })

        return response.status(this.unauthorized).json({
          status: ERROR,
          status_code: this.unauthorized,
          message: ACCOUNT_VERIFICATION_IS_REQUIRED,
        })
      }

      if (landlordTeamMember!.isAccountLocked === 'Yes') {
        return response.status(this.unauthorized).json({
          status: ERROR,
          status_code: this.unauthorized,
          message: ACCOUNT_IS_LOCKED,
        })
      }

      await auth.use('landlordTeamMember').revoke()

      await LandlordTeamMemberActions.updateLandlordTeamMemberRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: landlordTeamMember!.id,
        },
        updatePayload: {
          lastLoginDate: businessConfig.currentDateTime,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      const accessToken = await auth.use('landlordTeamMember').attempt(email, password, {
        expiresIn: `${businessConfig.accessTokenExpirationTimeFrameInMinutes} minutes`,
      })

      const mutatedLandlordPayload = {
        identifier: landlordTeamMember!.identifier,
        first_name: landlordTeamMember!.firstName,
        last_name: landlordTeamMember!.lastName,
        email: landlordTeamMember!.email,
        phone_number: landlordTeamMember!.phoneNumber,
        access_credentials: accessToken,
        meta: {
          created_at: landlordTeamMember!.createdAt,
          last_login_date: landlordTeamMember!.lastLoginDate ?? NOT_APPLICABLE,
          has_activated_account: landlordTeamMember!.hasActivatedAccount,
          is_account_verified: landlordTeamMember!.isAccountVerified,
          is_account_locked: landlordTeamMember!.isAccountLocked,
        },
      }

      return response.ok({
        status_code: this.ok,
        status: SUCCESS,
        message: LANDLORD_AUTHENTICATION_SUCCESSFUL,
        results: mutatedLandlordPayload,
      })
    } catch (LandlordLoginControllerError) {
      console.log('LandlordLoginController.handle =>', LandlordLoginControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
