import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordActions from 'App/Actions/LandlordActions'
import {
  ERROR,
  LANDLORD_ACCOUNT_NOT_FOUND,
  LANDLORD_ACCOUNT_UPDATE_SUCCESSFUL,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class UnlockLandlordAccountController {
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

      if (landlord === null) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: LANDLORD_ACCOUNT_NOT_FOUND,
        })
      }

      await LandlordActions.updateLandlordRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: landlord.id,
        },
        updatePayload: {
          isAccountLocked: false,
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
    } catch (UnlockLandlordAccountControllerError) {
      console.log(
        'UnlockLandlordAccountController.handle => ',
        UnlockLandlordAccountControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
