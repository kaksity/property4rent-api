import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopActions from 'App/Actions/ShopActions'
import ShopUnitActions from 'App/Actions/ShopUnitActions'
import {
  ERROR,
  NULL_OBJECT,
  SHOP_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  SHOP_UNIT_NOT_FOUND,
  SHOP_UNIT_UPDATE_SUCCESSFUL,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import UpdateShopUnitSizeValidator from 'App/Validators/Landlord/V1/PropertyManagement/ShopManagement/UpdateShopUnitSizeValidator'

export default class UpdateShopSizeController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(UpdateShopUnitSizeValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { shopIdentifier, shopUnitIdentifier } = request.params()

      const loggedInLandlord = auth.use('landlordTeamMember').user!

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

      if (shop.landlordId !== loggedInLandlord.id) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: SHOP_NOT_FOUND,
        })
      }

      const shopUnit = await ShopUnitActions.getShopUnitRecord({
        identifierType: 'identifier',
        identifier: shopUnitIdentifier,
      })

      if (shopUnit === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: SHOP_UNIT_NOT_FOUND,
        })
      }

      const { length, breadth } = request.body()

      await ShopUnitActions.updateShopUnitRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: shopUnit.id,
        },
        updatePayload: {
          length,
          breadth,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: SHOP_UNIT_UPDATE_SUCCESSFUL,
      })
    } catch (UpdateShopSizeControllerError) {
      console.log('UpdateShopSizeControllerError.handle', UpdateShopSizeControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
