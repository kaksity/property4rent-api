import SettingsStateActions from 'App/Actions/SettingsStateActions'
import {
  SUCCESS,
  ERROR,
  SOMETHING_WENT_WRONG,
  STATE_LIST_SUCCESSFUL,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class FetchStateListController {
  private ok = HttpStatusCodeEnum.OK
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ response }) {
    try {
      const { settingsStatePayload: states } = await SettingsStateActions.listSettingsStates({})

      const mutatedResults = states.map((state) => {
        return {
          identifier: state.identifier,
          state_label: state.stateLabel,
        }
      })

      return response.status(this.ok).send({
        status_code: this.ok,
        status: SUCCESS,
        message: STATE_LIST_SUCCESSFUL,
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
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
