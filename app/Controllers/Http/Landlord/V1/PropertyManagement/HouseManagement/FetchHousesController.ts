import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HouseActions from 'App/Actions/HouseActions'
import {
  ERROR,
  NOT_APPLICABLE,
  HOUSE_LIST_FETCH_SUCCESSFUL,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import FetchHouseValidator from 'App/Validators/Landlord/V1/PropertyManagement/HouseManagement/FetchHouseValidator'

export default class FetchHousesController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(FetchHouseValidator)
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

      const { housePayload: houses, paginationMeta } = await HouseActions.listHouses({
        filterRecordOptions: {
          canViewInPublic: canViewInPublic ? (canViewInPublic === 'Yes' ? true : false) : undefined,
          landlordId: loggedInLandlordTeamMember.landlordId,
        },
        paginationOptions: {
          page,
          limit,
        },
      })

      const mutatedResults = houses.map((house) => {
        return {
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
          house_units_metrics: {
            total_number_of_units: house.units.length,
          },
        }
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: HOUSE_LIST_FETCH_SUCCESSFUL,
        results: mutatedResults,
        pagination_meta: paginationMeta,
      })
    } catch (FetchHousesControllerError) {
      console.log('FetchHousesControllerError.handle', FetchHousesControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
