import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LandlordActions from 'App/Actions/LandlordActions'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  SET_WALLET_PIN_SUCCESSFUL,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import SetWalletPinValidator from 'App/Validators/Landlord/V1/WalletManagement/SetWalletPinValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import LandlordWalletActions from 'App/Actions/LandlordWalletActions'

export default class SetWalletPinController {
  public internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  public unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  public created = HttpStatusCodeEnum.CREATED

  public async handle({ request, auth, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(SetWalletPinValidator)
      } catch (validationError) {
        await dbTransaction.rollback()
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { wallet_pin: walletPin } = request.body()

      const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

      const landlord = await LandlordActions.getLandlordRecord({
        identifierType: 'id',
        identifier: loggedInLandlordTeamMember.landlordId,
      })

      const hashedWalletPin = await Hash.make(walletPin)

      await LandlordWalletActions.updateLandlordWalletRecord({
        identifierOptions: {
          identifierType: 'landlordId',
          identifier: landlord!.id,
        },
        updatePayload: {
          walletPin: hashedWalletPin,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: SET_WALLET_PIN_SUCCESSFUL,
      })
    } catch (SetWalletPinControllerError) {
      console.log(
        '🚀 ~ SetWalletPinController.handle SetWalletPinControllerError ->',
        SetWalletPinControllerError
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
