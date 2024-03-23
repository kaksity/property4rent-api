import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HouseActions from 'App/Actions/HouseActions'
import {
  ERROR,
  NOT_APPLICABLE,
  NULL_OBJECT,
  HOUSE_FETCH_SUCCESSFUL,
  HOUSE_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class FetchSingleHouseController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      const { houseIdentifier } = request.params()

      const loggedInLandlord = auth.use('landlord').user!

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

      if (house.landlord.id !== loggedInLandlord.id) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: HOUSE_NOT_FOUND,
        })
      }

      const mutatedHouseUnits = house.units.map((houseUnit) => {
        return {
          identifier: houseUnit.identifier,
          house_unit_type: houseUnit.houseUnitType,
          number_of_rooms: houseUnit.numberOfRooms,
          number_of_bathrooms: houseUnit.numberOfBathrooms,
          number_of_kitchens: houseUnit.numberOfKitchens,
          length: houseUnit.length,
          breadth: houseUnit.breadth,
          base_amount: houseUnit.baseAmount,
          minimum_amount: houseUnit.minimumAmount,
          maximum_amount: houseUnit.maximumAmount,
          possible_suitable_tenants: JSON.parse(houseUnit.possibleSuitableTenants),
        }
      })

      const mutatedResults = {
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
          longitude: house.information.longitude || NOT_APPLICABLE,
          latitude: house.information.latitude || NOT_APPLICABLE,
        },
        house_units: mutatedHouseUnits,
      }

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: HOUSE_FETCH_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (FetchSingleHouseControllerError) {
      console.log('FetchSingleHouseControllerError.handle', FetchSingleHouseControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
