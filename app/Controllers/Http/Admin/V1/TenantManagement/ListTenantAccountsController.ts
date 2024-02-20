import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TenantActions from 'App/Actions/TenantActions'
import {
  ERROR,
  TENANT_ACCOUNT_LIST_SUCCESSFUL,
  NOT_APPLICABLE,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import ListTenantAccountsValidator from 'App/Validators/Admin/V1/TenantManagement/ListTenantAccountsValidator'
export default class ListTenantAccountsController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, response }: HttpContextContract) {
    try {
      try {
        await request.validate(ListTenantAccountsValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { per_page: limit = 100, page = 1 } = request.qs()

      const { tenantPayload: tenants, paginationMeta } = await TenantActions.listTenants({
        paginationOptions: {
          page,
          limit,
        },
      })

      const mutatedResults = tenants.map((tenant) => {
        return {
          identifier: tenant.identifier,
          first_name: tenant.firstName,
          last_name: tenant.lastName,
          email: tenant.email,
          phone_number: tenant.phoneNumber,
          meta: {
            last_login_date: tenant.lastLoginDate ?? NOT_APPLICABLE,
            has_activated_account: tenant.hasActivatedAccount,
            is_account_verified: tenant.isAccountVerified,
            is_account_locked: tenant.isAccountLocked,
          },
        }
      })
      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: TENANT_ACCOUNT_LIST_SUCCESSFUL,
        results: mutatedResults,
        pagination_meta: paginationMeta,
      })
    } catch (ListTenantAccountsControllerError) {
      console.log('ListTenantAccountsController.handle', ListTenantAccountsControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
