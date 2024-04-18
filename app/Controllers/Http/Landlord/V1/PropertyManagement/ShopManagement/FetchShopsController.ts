import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopActions from 'App/Actions/ShopActions'
import {
  ERROR,
  NOT_APPLICABLE,
  SHOP_LIST_FETCH_SUCCESSFUL,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import FetchShopValidator from 'App/Validators/Landlord/V1/PropertyManagement/ShopManagement/FetchShopValidator'

export default class FetchShopsController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(FetchShopValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { per_page: limit = 100, page = 1, can_view_in_public: canViewInPublic } = request.qs()

      const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

      const { shopPayload: shops, paginationMeta } = await ShopActions.listShops({
        filterRecordOptions: {
          canViewInPublic: canViewInPublic ? (canViewInPublic === 'Yes' ? true : false) : undefined,
          landlordId: loggedInLandlordTeamMember.landlordId,
        },
        paginationOptions: {
          page,
          limit,
        },
      })

      const mutatedResults = shops.map((shop) => {
        return {
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
          shop_units_metrics: {
            total_number_of_units: shop.units.length,
          },
        }
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: SHOP_LIST_FETCH_SUCCESSFUL,
        results: mutatedResults,
        pagination_meta: paginationMeta,
      })
    } catch (FetchShopsControllerError) {
      console.log('FetchShopsControllerError.handle', FetchShopsControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
