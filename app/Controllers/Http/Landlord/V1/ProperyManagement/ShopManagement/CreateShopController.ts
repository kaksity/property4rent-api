import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopActions from 'App/Actions/ShopActions'
import {
  ERROR,
  SHOP_LIST_FETCH_SUCCESSFUL,
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
    try {
      try {
        await request.validate(CreateShopValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { description } = request.body()

      const landlord = auth.use('landlord').user!

      const shop = await ShopActions.createShopRecord({
        createPayload: {
          description,
          landlordId: landlord.id,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      const mutatedResults = {
        identifier: shop.identifier,
        description: shop.description,
      }

      return response.created({
        status: SUCCESS,
        status_code: this.created,
        message: SHOP_LIST_FETCH_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (CreateShopControllerError) {
      console.log('CreateShopControllerError.handle', CreateShopControllerError)

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
