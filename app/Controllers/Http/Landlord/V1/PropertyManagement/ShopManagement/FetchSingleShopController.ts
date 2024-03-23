import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopActions from 'App/Actions/ShopActions'
import {
  ERROR,
  NOT_APPLICABLE,
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

      const loggedInLandlord = auth.use('landlord').user!

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

      if (shop.landlord.id !== loggedInLandlord.id) {
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
            identifier: shop.information.state?.identifier || NOT_APPLICABLE,
            label: shop.information.state?.stateLabel || NOT_APPLICABLE,
          },
          lga: {
            identifier: shop.information.lga?.identifier || NOT_APPLICABLE,
            label: shop.information.lga?.lgaLabel || NOT_APPLICABLE,
          },
          area: shop.information.area || NOT_APPLICABLE,
          nearest_landmark: shop.information.nearestLandmark || NOT_APPLICABLE,
          longitude: shop.information.longitude || NOT_APPLICABLE,
          latitude: shop.information.latitude || NOT_APPLICABLE,
        },
        size: {
          length: shop.information.length,
          bread: shop.information.breadth,
        },
        rent_amount: {
          base_rent_amount: shop.information.baseRentAmount,
          minimum_rent_amount: shop.information.minimumRentAmount,
          maximum_rent_amount: shop.information.maximumRentAmount,
        },
        possible_use_cases: JSON.parse(shop.information.possibleUseCases) || [],
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
