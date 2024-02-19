import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ERROR, SOMETHING_WENT_WRONG } from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class AssignTenantToShopController {

  public internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ request, auth, response }: HttpContextContract) {
    try {

    } catch (AssignTenantToShopControllerError) {
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}