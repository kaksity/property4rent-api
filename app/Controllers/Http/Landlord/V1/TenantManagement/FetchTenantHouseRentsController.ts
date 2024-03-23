import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import TenantHouseRentActions from 'App/Actions/TenantHouseRentActions'
import FetchTenantHouseRentsValidator from 'App/Validators/Landlord/V1/TenantManagement/FetchTenantHouseRentsValidator'
import TenantActions from 'App/Actions/TenantActions'
import HouseUnitActions from 'App/Actions/HouseUnitActions'

export default class FetchTenantHouseRentsController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(FetchTenantHouseRentsValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const loggedInLandlord = auth.use('landlord').user!

      const {
        per_page: limit = 100,
        page = 1,
        tenant_identifier: tenantIdentifier,
        house_unit_identifier: houseUnitIdentifier,
        rent_status: rentStatus,
      } = request.qs()

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'identifier',
        identifier: tenantIdentifier,
      })

      const houseUnit = await HouseUnitActions.getHouseUnitRecord({
        identifierType: 'identifier',
        identifier: houseUnitIdentifier,
      })

      const { tenantHouseRentPayload, paginationMeta } =
        await TenantHouseRentActions.listTenantHouseRents({
          filterRecordOptions: {
            houseUnitId: houseUnit?.id,
            tenantId: tenant?.id,
            rentStatus,
            landlordId: loggedInLandlord.id,
          },
          paginationOptions: {
            page,
            limit,
          },
        })

      const mutatedResults = tenantHouseRentPayload.map((tenantHouseRent) => {
        return {
          identifier: tenantHouseRent.identifier,
          tenant: {
            identifier: tenantHouseRent.tenant.identifier,
            first_name: tenantHouseRent.tenant.firstName,
            last_name: tenantHouseRent.tenant.lastName,
          },
          landlord: {
            identifier: tenantHouseRent.landlord.identifier,
            first_name: tenantHouseRent.landlord.firstName,
            last_name: tenantHouseRent.landlord.lastName,
          },
          house: {
            identifier: tenantHouseRent.houseUnit.house.identifier,
            description: tenantHouseRent.houseUnit.house.description,
            canViewInPublic: tenantHouseRent.houseUnit.house.canViewInPublic,
            house_unit: {
              identifier: tenantHouseRent.houseUnit.identifier,
              house_unit_type: tenantHouseRent.houseUnit.houseUnitType,
              number_of_rooms: tenantHouseRent.houseUnit.numberOfRooms,
              number_of_bathrooms: tenantHouseRent.houseUnit.numberOfBathrooms,
              number_of_kitchens: tenantHouseRent.houseUnit.numberOfKitchens,
            },
          },
          rent_status: tenantHouseRent.rentStatus,
          paid_rent_amount: tenantHouseRent.paidRentAmount,
          house_rent_amount: tenantHouseRent.houseRentAmount,
          start_rent_date: tenantHouseRent.startRentDate,
          end_rent_date: tenantHouseRent.endRentDate,
        }
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        results: mutatedResults,
        pagination_meta: paginationMeta,
      })
    } catch (FetchTenantHouseRentsControllerError) {
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
