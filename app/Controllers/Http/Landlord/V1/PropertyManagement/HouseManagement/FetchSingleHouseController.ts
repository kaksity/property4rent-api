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
        size: {
          length: house.information.length,
          bread: house.information.breadth,
        },
        rent_amount: {
          base_amount: house.information.baseAmount,
          minimum_amount: house.information.minimumAmount,
          maximum_amount: house.information.maximumAmount,
        },
        possible_use_cases: JSON.parse(house.information.possibleUseCases) || [],
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
