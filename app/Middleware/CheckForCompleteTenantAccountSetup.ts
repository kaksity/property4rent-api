import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  ERROR,
  TENANT_ACCOUNT_HAS_NOT_ACTIVATED_ACCOUNT,
  TENANT_ACCOUNT_IS_LOCKED,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class CheckForCompleteTenantAccountSetup {
  private unauthorized = HttpStatusCodeEnum.UNAUTHORIZED

  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const loggedInTenant = auth.use('tenant').user!

    if (loggedInTenant.hasActivatedAccount === 'No') {
      return response.unauthorized({
        status: ERROR,
        status_code: this.unauthorized,
        message: TENANT_ACCOUNT_HAS_NOT_ACTIVATED_ACCOUNT,
        meta: {
          has_activated_account: loggedInTenant.hasActivatedAccount,
          is_account_verified: loggedInTenant.isAccountVerified,
          is_account_locked: loggedInTenant.isAccountLocked,
        },
      })
    }

    if (loggedInTenant.isAccountLocked === 'Yes') {
      return response.unauthorized({
        status: ERROR,
        status_code: this.unauthorized,
        message: TENANT_ACCOUNT_IS_LOCKED,
        meta: {
          has_activated_account: loggedInTenant.hasActivatedAccount,
          is_account_verified: loggedInTenant.isAccountVerified,
          is_account_locked: loggedInTenant.isAccountLocked,
        },
      })
    }
    await next()
  }
}
