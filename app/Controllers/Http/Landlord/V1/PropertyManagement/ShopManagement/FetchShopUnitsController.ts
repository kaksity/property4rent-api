import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopUnitActions from 'App/Actions/ShopUnitActions'
import ShopActions from 'App/Actions/ShopActions'
import {
  ERROR,
  NOT_APPLICABLE,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  SHOP_NOT_FOUND,
  NULL_OBJECT,
  SHOP_UNIT_LIST_FETCH_SUCCESSFUL,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import FetchShopUnitValidator from 'App/Validators/Landlord/V1/PropertyManagement/ShopManagement/FetchShopUnitValidator'

export default class FetchShopUnitController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(FetchShopUnitValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }
      const { shopIdentifier } = request.params()

      const { per_page: limit = 100, page = 1 } = request.qs()

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

      const { shopUnitPayload: shopUnits, paginationMeta } = await ShopUnitActions.listShopUnits({
        filterRecordOptions: {
          shopId: shop.id,
        },
        paginationOptions: {
          page,
          limit,
        },
      })

      const mutatedShopResults = {
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
        },
      }

      const mutatedShopUnitsResults = shopUnits.map((shop) => {
        return {
          identifier: shop.identifier,
          number_of_rooms: shop.numberOfRooms,
          number_of_toilets: shop.numberOfToilets,
          base_rent_amount: shop.baseRentAmount,
          minimum_rent_amount: shop.minimumRentAmount,
          maximum_rent_amount: shop.maximumRentAmount,
          length: shop.length,
          breadth: shop.breadth,
          occupation_status: shop.occupationStatus,
        }
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: SHOP_UNIT_LIST_FETCH_SUCCESSFUL,
        results: {
          shop: mutatedShopResults,
          shop_units: mutatedShopUnitsResults,
        },
        pagination_meta: paginationMeta,
      })
    } catch (FetchShopUnitControllerError) {
      console.log('FetchShopUnitControllerError.handle', FetchShopUnitControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
