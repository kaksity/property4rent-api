import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import HouseActions from 'App/Actions/HouseActions'
import HouseInformationActions from 'App/Actions/HouseInformationActions'
import {
  ERROR,
  HOUSE_CREATE_SUCCESSFUL,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import CreateHouseValidator from 'App/Validators/Landlord/V1/PropertyManagement/HouseManagement/CreateHouseValidator'

export default class CreateHouseController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ request, auth, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(CreateHouseValidator)
      } catch (validationError) {
        await dbTransaction.rollback()
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { description } = request.body()

      const landlord = auth.use('landlord').user!

      const house = await HouseActions.createHouseRecord({
        createPayload: {
          description,
          landlordId: landlord.id,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await HouseInformationActions.createHouseInformationRecord({
        createPayload: {
          houseId: house.id,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await dbTransaction.commit()

      const mutatedResults = {
        identifier: house.identifier,
        description: house.description,
      }

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: HOUSE_CREATE_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (CreateHouseControllerError) {
      console.log('CreateHouseControllerError.handle', CreateHouseControllerError)
      await dbTransaction.rollback()
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
