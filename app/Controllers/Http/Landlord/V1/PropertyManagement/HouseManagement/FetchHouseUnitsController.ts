import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HouseActions from 'App/Actions/HouseActions'
import HouseUnitActions from 'App/Actions/HouseUnitActions'
import {
  ERROR,
  NOT_APPLICABLE,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  HOUSE_NOT_FOUND,
  NULL_OBJECT,
  HOUSE_UNIT_LIST_FETCH_SUCCESSFUL,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import FetchHouseUnitsValidator from 'App/Validators/Landlord/V1/PropertyManagement/HouseManagement/FetchHouseUnitsValidator'

export default class FetchHouseUnitsController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(FetchHouseUnitsValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }
      const { houseIdentifier } = request.params()

      const { per_page: limit = 100, page = 1 } = request.qs()

      const loggedInLandlord = auth.use('landlordTeamMember').user!

      const house = await HouseActions.getHouseRecord({
        identifierType: 'identifier',
        identifier: houseIdentifier,
      })

      if (house === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: HOUSE_NOT_FOUND,
        })
      }

      if (house.landlordId !== loggedInLandlord.id) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: HOUSE_NOT_FOUND,
        })
      }

      const { houseUnitPayload: houseUnits, paginationMeta } =
        await HouseUnitActions.listHouseUnits({
          filterRecordOptions: {
            houseId: house.id,
          },
          paginationOptions: {
            page,
            limit,
          },
        })

      const mutatedHouseResults = {
        identifier: house.identifier,
        description: house.description,
        location: {
          state: {
            identifier: house.information.state?.identifier || NOT_APPLICABLE,
            label: house.information.state?.stateLabel || NOT_APPLICABLE,
          },
          lga: {
            identifier: house.information.lga?.identifier || NOT_APPLICABLE,
            label: house.information.lga?.lgaLabel || NOT_APPLICABLE,
          },
          area: house.information.area || NOT_APPLICABLE,
          nearest_landmark: house.information.nearestLandmark || NOT_APPLICABLE,
        },
      }

      const mutatedHouseUnitsResults = houseUnits.map((houseUnit) => {
        return {
          identifier: houseUnit.identifier,
          house_unit_type: houseUnit.houseUnitType,
          number_of_rooms: houseUnit.numberOfRooms,
          number_of_bathrooms: houseUnit.numberOfBathrooms,
          number_of_kitchens: houseUnit.numberOfKitchens,
          base_rent_amount: houseUnit.baseRentAmount,
          minimum_rent_amount: houseUnit.minimumRentAmount,
          maximum_rent_amount: houseUnit.maximumRentAmount,
          length: houseUnit.length,
          breadth: houseUnit.breadth,
          occupation_status: houseUnit.occupationStatus,
        }
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: HOUSE_UNIT_LIST_FETCH_SUCCESSFUL,
        results: {
          house: mutatedHouseResults,
          house_units: mutatedHouseUnitsResults,
        },
        pagination_meta: paginationMeta,
      })
    } catch (FetchHouseUnitsControllerError) {
      console.log('FetchHouseUnitsControllerError.handle', FetchHouseUnitsControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
