import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HouseActions from 'App/Actions/HouseActions'
import HouseInformationActions from 'App/Actions/HouseInformationActions'
import {
  ERROR,
  NULL_OBJECT,
  HOUSE_UPDATE_SUCCESSFUL,
  HOUSE_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import UpdateHousePossibleUseCasesValidator from 'App/Validators/Landlord/V1/PropertyManagement/HouseManagement/UpdateHousePossibleUseCasesValidator'

export default class UpdateHousePossibleUseCasesController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(UpdateHousePossibleUseCasesValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

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

      const { possible_use_cases: possibleUseCases } = request.body()

      await HouseInformationActions.updateHouseInformationRecord({
        identifierOptions: {
          identifierType: 'houseId',
          identifier: house.id,
        },
        updatePayload: {
          possibleUseCases: JSON.stringify(possibleUseCases),
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: HOUSE_UPDATE_SUCCESSFUL,
      })
    } catch (UpdateHousePossibleUseCasesControllerError) {
      console.log(
        'UpdateHousePossibleUseCasesControllerError.handle',
        UpdateHousePossibleUseCasesControllerError
      )

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
