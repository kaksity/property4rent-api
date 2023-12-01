import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopActions from 'App/Actions/ShopActions'
import ShopInformationActions from 'App/Actions/ShopInformationActions'
import {
  ERROR,
  NULL_OBJECT,
  SHOP_UPDATE_SUCCESSFUL,
  SHOP_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import UpdateShopPossibleUseCasesValidator from 'App/Validators/Landlord/V1/PropertyManagement/ShopManagement/UpdateShopPossibleUseCasesValidator'

export default class UpdateShopPossibleUseCasesController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(UpdateShopPossibleUseCasesValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { shopIdentifier } = request.params()

      const landlord = auth.use('landlord').user!

      const shop = await ShopActions.getShopRecord({
        identifierType: 'identifier',
        identifier: shopIdentifier,
      })

      if (shop === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: SHOP_NOT_FOUND,
        })
      }

      if (shop.landlord.id !== landlord.id) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: SHOP_NOT_FOUND,
        })
      }

      const { possible_use_cases: possibleUseCases } = request.body()

      await ShopInformationActions.updateShopInformationRecord({
        identifierOptions: {
          identifierType: 'shopId',
          identifier: shop.id,
        },
        updatePayload: {
          possibleUseCases: JSON.stringify(possibleUseCases)
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: SHOP_UPDATE_SUCCESSFUL,
      })
    } catch (UpdateShopPossibleUseCasesControllerError) {
      console.log('UpdateShopPossibleUseCasesControllerError.handle', UpdateShopPossibleUseCasesControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
