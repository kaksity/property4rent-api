import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopActions from 'App/Actions/ShopActions'
import TenantActions from 'App/Actions/TenantActions'
import { ERROR, SOMETHING_WENT_WRONG, VALIDATION_ERROR } from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import AssignTenantToShopValidator from 'App/Validators/Landlord/V1/TenantManagement/AssignTenantToShopValidator'

export default class AssignTenantToShopController {
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(AssignTenantToShopValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { shop_identifier: shopIdentifier, tenant_identifier: tenantIdentifier } =
        request.body()

      const shop = await ShopActions.getShopRecord({
        identifier: shopIdentifier,
        identifierType: 'identifier',
      })

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'identifier',
        identifier: tenantIdentifier,
      })
    } catch (AssignTenantToShopControllerError) {
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
