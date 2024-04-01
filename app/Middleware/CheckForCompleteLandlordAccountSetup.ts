import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  ERROR,
  LANDLORD_ACCOUNT_HAS_NOT_ACTIVATED_ACCOUNT,
  LANDLORD_ACCOUNT_IS_LOCKED,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class CheckForCompleteLandlordAccountSetup {
  private unauthorized = HttpStatusCodeEnum.UNAUTHORIZED

  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const loggedInLandlord = auth.use('landlord').user!

    if (loggedInLandlord.hasActivatedAccount === 'No') {
      return response.unauthorized({
        status: ERROR,
        status_code: this.unauthorized,
        message: LANDLORD_ACCOUNT_HAS_NOT_ACTIVATED_ACCOUNT,
        meta: {
          has_activated_account: loggedInLandlord.hasActivatedAccount,
          is_account_verified: loggedInLandlord.isAccountVerified,
          is_account_locked: loggedInLandlord.isAccountLocked,
        },
      })
    }

    if (loggedInLandlord.isAccountLocked === 'Yes') {
      return response.unauthorized({
        status: ERROR,
        status_code: this.unauthorized,
        message: LANDLORD_ACCOUNT_IS_LOCKED,
        meta: {
          has_activated_account: loggedInLandlord.hasActivatedAccount,
          is_account_verified: loggedInLandlord.isAccountVerified,
          is_account_locked: loggedInLandlord.isAccountLocked,
        },
      })
    }
    await next()
  }
}
