import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  TENANT_HOUSE_UNIT_RENT_LIST_FETCH_SUCCESSFUL,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import TenantHouseUnitRentActions from 'App/Actions/TenantHouseUnitRentActions'
import FetchTenantHouseUnitRentsValidator from 'App/Validators/Landlord/V1/RentManagement/House/FetchTenantHouseUnitRentsValidator'
import TenantActions from 'App/Actions/TenantActions'
import HouseUnitActions from 'App/Actions/HouseUnitActions'

export default class FetchTenantHouseUnitRentsController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(FetchTenantHouseUnitRentsValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

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

      const { tenantHouseUnitRentPayload, paginationMeta } =
        await TenantHouseUnitRentActions.listTenantHouseUnitRents({
          filterRecordOptions: {
            houseUnitId: houseUnit?.id,
            tenantId: tenant?.id,
            rentStatus,
            landlordId: loggedInLandlordTeamMember.landlordId,
          },
          paginationOptions: {
            page,
            limit,
          },
        })

      const mutatedResults = tenantHouseUnitRentPayload.map((tenantHouseUnitRent) => {
        return {
          identifier: tenantHouseUnitRent.identifier,
          tenant: {
            identifier: tenantHouseUnitRent.tenant.identifier,
            first_name: tenantHouseUnitRent.tenant.firstName,
            last_name: tenantHouseUnitRent.tenant.lastName,
          },
          landlord: {
            identifier: tenantHouseUnitRent.landlord.identifier,
            name: tenantHouseUnitRent.landlord.name,
            address: tenantHouseUnitRent.landlord.address,
          },
          house: {
            identifier: tenantHouseUnitRent.houseUnit.house.identifier,
            description: tenantHouseUnitRent.houseUnit.house.description,
            canViewInPublic: tenantHouseUnitRent.houseUnit.house.canViewInPublic,
            house_unit: {
              identifier: tenantHouseUnitRent.houseUnit.identifier,
              house_unit_type: tenantHouseUnitRent.houseUnit.houseUnitType,
              number_of_rooms: tenantHouseUnitRent.houseUnit.numberOfRooms,
              number_of_bathrooms: tenantHouseUnitRent.houseUnit.numberOfBathrooms,
              number_of_kitchens: tenantHouseUnitRent.houseUnit.numberOfKitchens,
            },
          },
          rent_status: tenantHouseUnitRent.rentStatus,
          paid_rent_amount: tenantHouseUnitRent.paidRentAmount,
          house_rent_amount: tenantHouseUnitRent.houseRentAmount,
          start_rent_date: tenantHouseUnitRent.startRentDate,
          end_rent_date: tenantHouseUnitRent.endRentDate,
        }
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: TENANT_HOUSE_UNIT_RENT_LIST_FETCH_SUCCESSFUL,
        results: mutatedResults,
        pagination_meta: paginationMeta,
      })
    } catch (FetchTenantHouseUnitRentsControllerError) {
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
