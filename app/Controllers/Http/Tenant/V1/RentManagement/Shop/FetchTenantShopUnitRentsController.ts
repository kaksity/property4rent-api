import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  TENANT_HOUSE_UNIT_RENT_LIST_FETCH_SUCCESSFUL,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import TenantShopUnitRentActions from 'App/Actions/TenantShopUnitRentActions'
import FetchTenantShopRentsValidator from 'App/Validators/Tenant/V1/RentManagement/Shop/FetchTenantShopRentsValidator'
import ShopUnitActions from 'App/Actions/ShopUnitActions'

export default class FetchTenantShopUnitRentsController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(FetchTenantShopRentsValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const loggedInTenant = auth.use('tenant').user!

      const {
        per_page: limit = 100,
        page = 1,
        shop_unit_identifier: shopUnitIdentifier,
        rent_status: rentStatus,
      } = request.qs()

      const shopUnit = await ShopUnitActions.getShopUnitRecord({
        identifierType: 'identifier',
        identifier: shopUnitIdentifier,
      })

      const { tenantShopUnitRentPayload, paginationMeta } =
        await TenantShopUnitRentActions.listTenantShopUnitRents({
          filterRecordOptions: {
            shopUnitId: shopUnit?.id,
            tenantId: loggedInTenant.id,
            rentStatus,
          },
          paginationOptions: {
            page,
            limit,
          },
        })

      const mutatedResults = tenantShopUnitRentPayload.map((tenantShopUnitRent) => {
        return {
          identifier: tenantShopUnitRent.identifier,
          tenant: {
            identifier: tenantShopUnitRent.tenant.identifier,
            first_name: tenantShopUnitRent.tenant.firstName,
            last_name: tenantShopUnitRent.tenant.lastName,
          },
          landlord: {
            identifier: tenantShopUnitRent.landlord.identifier,
            first_name: tenantShopUnitRent.landlord.firstName,
            last_name: tenantShopUnitRent.landlord.lastName,
          },
          house: {
            identifier: tenantShopUnitRent.shopUnit.shop.identifier,
            description: tenantShopUnitRent.shopUnit.shop.description,
            canViewInPublic: tenantShopUnitRent.shopUnit.shop.canViewInPublic,
            house_unit: {
              identifier: tenantShopUnitRent.shopUnit.identifier,
              number_of_rooms: tenantShopUnitRent.shopUnit.numberOfRooms,
              number_of_toilets: tenantShopUnitRent.shopUnit.numberOfToilets,
            },
          },
          rent_status: tenantShopUnitRent.rentStatus,
          paid_rent_amount: tenantShopUnitRent.paidRentAmount,
          house_rent_amount: tenantShopUnitRent.shopRentAmount,
          start_rent_date: tenantShopUnitRent.startRentDate,
          end_rent_date: tenantShopUnitRent.endRentDate,
        }
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        results: mutatedResults,
        message: TENANT_HOUSE_UNIT_RENT_LIST_FETCH_SUCCESSFUL,
        pagination_meta: paginationMeta,
      })
    } catch (FetchTenantShopUnitRentsControllerError) {
      console.log(
        'FetchTenantShopUnitRentsControllerError => ',
        FetchTenantShopUnitRentsControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
