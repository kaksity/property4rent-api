import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TenantActions from 'App/Actions/TenantActions'
import {
  ERROR,
  TENANT_ACCOUNT_FETCHED_SUCCESSFUL,
  TENANT_ACCOUNT_NOT_FOUND,
  NOT_APPLICABLE,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
export default class FetchSingleTenantAccountController {
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ request, response }: HttpContextContract) {
    try {
      const { tenantIdentifier } = request.params()

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'identifier',
        identifier: tenantIdentifier,
      })

      if (tenant === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: TENANT_ACCOUNT_NOT_FOUND,
        })
      }

      const mutatedResults = {
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

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: TENANT_ACCOUNT_FETCHED_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (FetchSingleTenantAccountControllerError) {
      console.log(
        'FetchSingleTenantAccountController.handle => ',
        FetchSingleTenantAccountControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
