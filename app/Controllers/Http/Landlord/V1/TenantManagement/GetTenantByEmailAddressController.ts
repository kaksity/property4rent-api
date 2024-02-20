import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TenantActions from 'App/Actions/TenantActions'
import {
  ERROR,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  TENANT_ACCOUNT_FETCHED_SUCCESSFUL,
  TENANT_ACCOUNT_NOT_FOUND,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class GetTenantByEmailAddressController {
  public internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  public notFound = HttpStatusCodeEnum.NOT_FOUND
  public ok = HttpStatusCodeEnum.OK

  public async handle({ request, response }: HttpContextContract) {
    try {
      const { emailAddress: tenantEmailAddress } = request.params()

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'email',
        identifier: tenantEmailAddress,
      })

      if (tenant === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: TENANT_ACCOUNT_NOT_FOUND,
        })
      }

      const mutatedTenantResponsePayload = {
        identifier: tenant.identifier,
        first_name: tenant.firstName,
        last_name: tenant.lastName,
        email: tenant.email,
        phone_number: tenant.phoneNumber,
      }

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: TENANT_ACCOUNT_FETCHED_SUCCESSFUL,
        results: mutatedTenantResponsePayload,
      })
    } catch (GetTenantByEmailAddressControllerError) {
      console.log(
        '🚀 ~ GetTenantByEmailAddressController.handle GetTenantByEmailAddressControllerError ->',
        GetTenantByEmailAddressControllerError
      )

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
