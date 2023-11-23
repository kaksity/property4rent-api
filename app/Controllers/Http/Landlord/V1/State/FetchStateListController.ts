import HttpStatusCodeEnum from 'App/Common/Helpers/HttpStatusCodeEnum'
import {
  STATE_LIST_FETCH_FAILED,
  STATE_LIST_FETCH_SUCCESSFUL,
  COUNTRY_DOES_NOT_EXIST,
  ERROR,
  FAILURE,
  NULL_OBJECT,
  SUCCESS,
} from 'App/Common/Helpers/Messages/SystemMessages'
import SettingsCountryActions from 'App/Systems/Settings/Location/Actions/SettingsCountryActions'
import SettingsStateActions from 'App/Systems/Settings/Location/Actions/SettingsStateActions'

export default class FetchStateListController {
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ request, response }) {
    try {
      const { countryIdentifier } = request.params()

      const country = await SettingsCountryActions.getSettingsCountryRecord({
        identifier: countryIdentifier,
        identifierType: 'identifier',
      })

      if (country === NULL_OBJECT) {
        return response.status(this.notFound).send({
          status_code: this.notFound,
          success: FAILURE,
          message: COUNTRY_DOES_NOT_EXIST,
        })
      }

      const states = await SettingsStateActions.listSettingsStatesByCountryId(country.id)

      const mutatedResults = states.map((state) => {
        return {
          identifier: state.identifier,
          state_label: state.stateLabel,
          state_slug: state.stateSlug,
        }
      })

      return response.status(this.ok).send({
        status_code: this.ok,
        status: SUCCESS,
        message: STATE_LIST_FETCH_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (FetchStateListControllerError) {
      console.log(
        '🚀 ~ FetchStateListController.handle FetchStateListControllerError ->',
        FetchStateListControllerError
      )

      return response.status(this.internalServerError).send({
        status_code: this.internalServerError,
        status: ERROR,
        message: STATE_LIST_FETCH_FAILED,
      })
    }
  }
}
