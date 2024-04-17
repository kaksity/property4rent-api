import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ShopActions from 'App/Actions/ShopActions'
import ShopInformationActions from 'App/Actions/ShopInformationActions'
import {
  ERROR,
  SHOP_CREATE_SUCCESSFUL,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import CreateShopValidator from 'App/Validators/Landlord/V1/PropertyManagement/ShopManagement/CreateShopValidator'

export default class CreateShopController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private created = HttpStatusCodeEnum.CREATED

  public async handle({ request, auth, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(CreateShopValidator)
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

      const loggedInLandlord = auth.use('landlordTeamMember').user!

      const shop = await ShopActions.createShopRecord({
        createPayload: {
          description,
          landlordId: loggedInLandlord.id,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await ShopInformationActions.createShopInformationRecord({
        createPayload: {
          shopId: shop.id,
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await dbTransaction.commit()

      const mutatedResults = {
        identifier: shop.identifier,
        description: shop.description,
      }

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: SHOP_CREATE_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (CreateShopControllerError) {
      console.log('CreateShopControllerError.handle', CreateShopControllerError)
      await dbTransaction.rollback()
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
