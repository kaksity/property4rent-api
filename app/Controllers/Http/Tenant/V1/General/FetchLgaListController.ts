import SettingsStateActions from 'App/Actions/SettingsStateActions'
import SettingsLgaActions from 'App/Actions/SettingsLgaActions'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import {
  ERROR,
  LGA_LIST_FETCH_SUCCESSFUL,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import FetchLgasValidator from 'App/Validators/Tenant/V1/General/FetchLgasValidator'

export default class FetchLgaListController {
  private ok = HttpStatusCodeEnum.OK
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, response }) {
    try {
      try {
        await request.validate(FetchLgasValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { state_identifier: stateIdentifier } = request.qs()

      const state = await SettingsStateActions.getSettingsStateRecord({
        identifier: stateIdentifier,
        identifierType: 'identifier',
      })

      const { settingsLgaPayload: lgas } = await SettingsLgaActions.listSettingsLgas({
        filterRecordOptions: {
          stateId: state?.id,
        },
      })

      const mutatedResults = lgas.map((lga) => {
        return {
          identifier: lga.identifier,
          lga_label: lga.lgaLabel,
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
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
