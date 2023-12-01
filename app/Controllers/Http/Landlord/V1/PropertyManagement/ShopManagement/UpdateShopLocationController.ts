import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLgaActions from 'App/Actions/SettingsLgaActions'
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
import UpdateShopLocationValidator from 'App/Validators/Landlord/V1/PropertyManagement/ShopManagement/UpdateShopLocationValidator'

export default class UpdateShopLocationController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(UpdateShopLocationValidator)
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

      const {
        lga_identifier: lgaIdentifier,
        area,
        nearest_landmark: nearestLandmark,
        longitude,
        latitude,
      } = request.body()

      const lga = await SettingsLgaActions.getSettingsLgaRecord({
        identifierType: 'identifier',
        identifier: lgaIdentifier,
      })

      await ShopInformationActions.updateShopInformationRecord({
        identifierOptions: {
          identifierType: 'shopId',
          identifier: shop.id,
        },
        updatePayload: {
          stateId: lga!.stateId,
          lgaId: lga!.id,
          area,
          nearestLandmark,
          longitude,
          latitude,
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
    } catch (UpdateShopLocationControllerError) {
      console.log('UpdateShopLocationControllerError.handle', UpdateShopLocationControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
