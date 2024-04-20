import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TenantWalletActions from 'App/Actions/TenantWalletActions'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  WALLET_DETAILS_FETCH_SUCCESSFUL,
  NOT_APPLICABLE,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class FetchWalletDetailsController {
  public internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  public notFound = HttpStatusCodeEnum.NOT_FOUND
  public ok = HttpStatusCodeEnum.OK

  public async handle({ auth, response }: HttpContextContract) {
    try {
      const loggedInTenant = auth.use('tenant').user!

      const tenantWallet = await TenantWalletActions.getTenantWalletRecord({
        identifierType: 'tenantId',
        identifier: loggedInTenant.id,
      })

      const mutatedTenantWalletResults = {
        identifier: tenantWallet!.identifier,
        tenant: {
          identifier: tenantWallet!.tenant.identifier,
          first_name: tenantWallet!.tenant.firstName,
          last_name: tenantWallet!.tenant.lastName,
        },
        wallet_account_number: tenantWallet!.walletAccountNumber,
        wallet_balance: tenantWallet!.walletBalance,
        total_inflow: tenantWallet!.totalInflow,
        total_outflow: tenantWallet!.totalOutflow,
        provider_account_number: tenantWallet!.providerAccountNumber || NOT_APPLICABLE,
        provider_account_name: tenantWallet!.providerAccountName || NOT_APPLICABLE,
        provider_bank_name: tenantWallet!.providerBankName || NOT_APPLICABLE,
      }

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: WALLET_DETAILS_FETCH_SUCCESSFUL,
        results: mutatedTenantWalletResults,
      })
    } catch (FetchWalletDetailsControllerError) {
      console.log(
        '🚀 ~ FetchWalletDetailsController.handle FetchWalletDetailsControllerError ->',
        FetchWalletDetailsControllerError
      )

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
