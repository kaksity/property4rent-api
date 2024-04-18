import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopActions from 'App/Actions/ShopActions'
import ShopUnitActions from 'App/Actions/ShopUnitActions'
import {
  ERROR,
  SHOP_NOT_FOUND,
  SHOP_UNIT_CREATE_SUCCESSFUL,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import CreateShopUnitValidator from 'App/Validators/Landlord/V1/PropertyManagement/ShopManagement/CreateShopUnitValidator'

export default class CreateShopUnitController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ auth, request, response }: HttpContextContract) {
    try {
      try {
        await request.validate(CreateShopUnitValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

      const { shopIdentifier } = request.params()

      const {
        number_of_rooms: numberOfRooms,
        number_of_toilets: numberOfToilets,
        possible_use_cases: possibleUseCases,
        minimum_rent_amount: minimumRentAmount,
        base_rent_amount: baseRentAmount,
        maximum_rent_amount: maximumRentAmount,
        length,
        breadth,
      } = request.body()

      const shop = await ShopActions.getShopRecord({
        identifierType: 'identifier',
        identifier: shopIdentifier,
      })

      if (shop === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: SHOP_NOT_FOUND,
        })
      }

      if (shop.landlordId !== loggedInLandlordTeamMember.landlordId) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: SHOP_NOT_FOUND,
        })
      }

      const createdShopUnit = await ShopUnitActions.createShopUnitRecord({
        createPayload: {
          shopId: shop!.id,
          numberOfRooms,
          numberOfToilets,
          possibleUseCases: JSON.stringify(possibleUseCases),
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
        identifier: createdShopUnit.identifier,
        number_of_rooms: createdShopUnit.numberOfRooms,
        number_of_bathrooms: createdShopUnit.numberOfToilets,
        possible_use_cases: JSON.parse(createdShopUnit.possibleUseCases),
        minimum_rent_amount: createdShopUnit.minimumRentAmount,
        maximum_rent_amount: createdShopUnit.maximumRentAmount,
        base_rent_amount: createdShopUnit.baseRentAmount,
        length: createdShopUnit.length,
        breadth: createdShopUnit.breadth,
        occupation_status: createdShopUnit.occupationStatus,
      }

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: SHOP_UNIT_CREATE_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (CreateShopUnitControllerError) {
      console.log('~CreateShopUnitController.handle => ', CreateShopUnitControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
