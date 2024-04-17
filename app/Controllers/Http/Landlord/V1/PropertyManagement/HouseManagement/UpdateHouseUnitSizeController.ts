import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HouseActions from 'App/Actions/HouseActions'
import HouseUnitActions from 'App/Actions/HouseUnitActions'
import {
  ERROR,
  NULL_OBJECT,
  HOUSE_UNIT_UPDATE_SUCCESSFUL,
  HOUSE_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
  HOUSE_UNIT_NOT_FOUND,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import UpdateHouseUnitSizeValidator from 'App/Validators/Landlord/V1/PropertyManagement/HouseManagement/UpdateHouseUnitSizeValidator'

export default class UpdateHouseUnitSizeController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(UpdateHouseUnitSizeValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { houseIdentifier, houseUnitIdentifier } = request.params()

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

      if (house.landlord.id !== loggedInLandlord.id) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: HOUSE_NOT_FOUND,
        })
      }

      const houseUnit = await HouseUnitActions.getHouseUnitRecord({
        identifier: houseUnitIdentifier,
        identifierType: 'identifier',
      })

      if (houseUnit === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: HOUSE_UNIT_NOT_FOUND,
        })
      }

      if (houseUnit.houseId !== house.id) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: HOUSE_UNIT_NOT_FOUND,
        })
      }

      const { length, breadth } = request.body()

      await HouseUnitActions.updateHouseUnitRecord({
        identifierOptions: {
          identifierType: 'identifier',
          identifier: houseUnit.identifier,
        },
        updatePayload: {
          length,
          breadth,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: HOUSE_UNIT_UPDATE_SUCCESSFUL,
      })
    } catch (UpdateHouseUnitSizeControllerError) {
      console.log('UpdateHouseUnitSizeControllerError.handle', UpdateHouseUnitSizeControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
