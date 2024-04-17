import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HouseActions from 'App/Actions/HouseActions'
import HouseUnitActions from 'App/Actions/HouseUnitActions'
import {
  ERROR,
  HOUSE_NOT_FOUND,
  HOUSE_UNIT_CREATE_SUCCESSFUL,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import CreateHouseUnitValidator from 'App/Validators/Landlord/V1/PropertyManagement/HouseManagement/CreateHouseUnitValidator'

export default class CreateHouseUnitController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ auth, request, response }: HttpContextContract) {
    try {
      try {
        await request.validate(CreateHouseUnitValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const loggedInLandlord = auth.use('landlordTeamMember').user!

      const { houseIdentifier } = request.params()

      const {
        house_unit_type: houseUnitType,
        number_of_rooms: numberOfRooms,
        number_of_bathrooms: numberOfBathrooms,
        number_of_kitchens: numberOfKitchens,
        possible_suitable_tenants: possibleSuitableTenants,
        minimum_rent_amount: minimumRentAmount,
        base_rent_amount: baseRentAmount,
        maximum_rent_amount: maximumRentAmount,
        length,
        breadth,
      } = request.body()

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

      const createdHouseUnit = await HouseUnitActions.createHouseUnitRecord({
        createPayload: {
          houseId: house!.id,
          houseUnitType,
          numberOfRooms,
          numberOfBathrooms,
          numberOfKitchens,
          possibleSuitableTenants: JSON.stringify(possibleSuitableTenants),
          minimumRentAmount,
          maximumRentAmount,
          baseRentAmount,
          length,
          breadth,
          occupationStatus: 'empty',
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      const mutatedResults = {
        identifier: createdHouseUnit.identifier,
        house_unit_type: createdHouseUnit.houseUnitType,
        number_of_rooms: createdHouseUnit.numberOfRooms,
        number_of_bathrooms: createdHouseUnit.numberOfBathrooms,
        number_of_kitchens: createdHouseUnit.numberOfKitchens,
        possible_suitable_tenants: JSON.parse(createdHouseUnit.possibleSuitableTenants),
        minimum_rent_amount: createdHouseUnit.minimumRentAmount,
        maximum_rent_amount: createdHouseUnit.maximumRentAmount,
        base_rent_amount: createdHouseUnit.baseRentAmount,
        length: createdHouseUnit.length,
        breadth: createdHouseUnit.breadth,
        occupation_status: createdHouseUnit.occupationStatus,
      }

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: HOUSE_UNIT_CREATE_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (CreateHouseUnitControllerError) {
      console.log('~CreateHouseUnitController.handle => ', CreateHouseUnitControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
