import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordActions from 'App/Actions/LandlordActions'
import {
  ERROR,
  LANDLORD_ACCOUNT_FETCHED_SUCCESSFUL,
  LANDLORD_ACCOUNT_NOT_FOUND,
  NOT_APPLICABLE,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
export default class FetchSingleLandlordAccountController {
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ request, response }: HttpContextContract) {
    try {
      const { landlordIdentifier } = request.params()

      const landlord = await LandlordActions.getLandlordRecord({
        identifierType: 'identifier',
        identifier: landlordIdentifier,
      })

      if (landlord === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: LANDLORD_ACCOUNT_NOT_FOUND,
        })
      }

      const mutatedResults = {
        identifier: landlord.identifier,
        first_name: landlord.firstName,
        last_name: landlord.lastName,
        email: landlord.email,
        phone_number: landlord.phoneNumber,
        meta: {
          last_login_date: landlord.lastLoginDate ?? NOT_APPLICABLE,
          has_activated_account: landlord.hasActivatedAccount,
          is_account_verified: landlord.isAccountVerified,
          is_account_locked: landlord.isAccountLocked,
        },
      }

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: LANDLORD_ACCOUNT_FETCHED_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (FetchSingleLandlordAccountControllerError) {
      console.log(
        'FetchSingleLandlordAccountController.handle => ',
        FetchSingleLandlordAccountControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
