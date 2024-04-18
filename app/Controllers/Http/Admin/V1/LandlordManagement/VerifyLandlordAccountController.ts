import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordActions from 'App/Actions/LandlordActions'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import {
  ERROR,
  LANDLORD_ACCOUNT_NOT_FOUND,
  LANDLORD_ACCOUNT_UPDATE_SUCCESSFUL,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class VerifyLandlordAccountController {
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

      await LandlordTeamMemberActions.verifyLandlordTeamMemberAccounts({
        identifierOptions: {
          landlordId: landlord.id,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: LANDLORD_ACCOUNT_UPDATE_SUCCESSFUL,
      })
    } catch (VerifyLandlordAccountControllerError) {
      console.log(
        'VerifyLandlordAccountController.handle => ',
        VerifyLandlordAccountControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
