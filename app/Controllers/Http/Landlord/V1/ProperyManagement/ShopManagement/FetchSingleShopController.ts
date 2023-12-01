import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopActions from 'App/Actions/ShopActions'
import {
  ERROR,
  NULL_OBJECT,
  SHOP_FETCH_SUCCESSFUL,
  SHOP_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class FetchSingleShopController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
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

      const mutatedResults = {
        identifier: shop.identifier,
        description: shop.description,
        location: {
          state: {
            identifier: shop.information.state.identifier,
            label: shop.information.state.stateLabel,
          },
          lga: {
            identifier: shop.information.lga.identifier,
            label: shop.information.lga.lgaLabel,
          },
          area: shop.information.area,
          nearest_landmark: shop.information.nearestLandmark,
          longitude: shop.information.longitude,
          latitude: shop.information.latitude,
        },
        size: {
          length: shop.information.length,
          bread: shop.information.breadth,
        },
        budget: {
          base_amount: shop.information.baseAmount,
          minimum_amount: shop.information.minimumAmount,
          maximum_amount: shop.information.maximumAmount,
        },
        possible_use_cases: JSON.parse(shop.information.possibleUseCases),
      }

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: SHOP_FETCH_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (FetchSingleShopControllerError) {
      console.log('FetchSingleShopControllerError.handle', FetchSingleShopControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
