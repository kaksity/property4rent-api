import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import TenantActions from 'App/Actions/TenantActions'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  SET_WALLET_PIN_SUCCESSFUL,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import SetWalletPinValidator from 'App/Validators/Tenant/V1/WalletManagement/SetWalletPinValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import TenantWalletActions from 'App/Actions/TenantWalletActions'

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

      const loggedInTenant = auth.use('tenant').user!

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'id',
        identifier: loggedInTenant.id,
      })

      const hashedWalletPin = await Hash.make(walletPin)

      await TenantWalletActions.updateTenantWalletRecord({
        identifierOptions: {
          identifierType: 'tenantId',
          identifier: tenant!.id,
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
