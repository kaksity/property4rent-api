import HttpStatusCodeEnum from 'App/Common/Helpers/HttpStatusCodeEnum'
import {
  LGA_LIST_FETCH_FAILED,
  LGA_LIST_FETCH_SUCCESSFUL,
  STATE_DOES_NOT_EXIST,
  ERROR,
  FAILURE,
  NULL_OBJECT,
  SUCCESS,
} from 'App/Common/Helpers/Messages/SystemMessages'
import SettingsStateActions from 'App/Systems/Settings/Location/Actions/SettingsStateActions'
import SettingsLgaActions from 'App/Systems/Settings/Location/Actions/SettingsLgaActions'

export default class FetchLgaListController {
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ request, response }) {
    try {
      const { stateIdentifier } = request.params()

      const state = await SettingsStateActions.getSettingsStateRecord({
        identifier: stateIdentifier,
        identifierType: 'identifier',
      })

      if (state === NULL_OBJECT) {
        return response.status(this.notFound).send({
          status_code: this.notFound,
          success: FAILURE,
          message: STATE_DOES_NOT_EXIST,
        })
      }

      const lgas = await SettingsLgaActions.listSettingsLgasByStateId(state.id)

      const mutatedResults = lgas.map((lga) => {
        return {
          identifier: lga.identifier,
          lga_label: lga.lgaLabel,
          lga_slug: lga.lgaSlug,
        }
      })

      return response.status(this.ok).send({
        status_code: this.ok,
        status: SUCCESS,
        message: LGA_LIST_FETCH_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (FetchLgaListControllerError) {
      console.log(
        '🚀 ~ FetchLgaListController.handle FetchLgaListControllerError ->',
        FetchLgaListControllerError
      )

      return response.status(this.internalServerError).send({
        status_code: this.internalServerError,
        status: ERROR,
        message: LGA_LIST_FETCH_FAILED,
      })
    }
  }
}
