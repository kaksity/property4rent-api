import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordWalletActions from 'App/Actions/LandlordWalletActions'
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
      const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

      const landlordWallet = await LandlordWalletActions.getLandlordWalletRecord({
        identifierType: 'landlordId',
        identifier: loggedInLandlordTeamMember.landlordId,
      })

      const mutatedLandlordWalletResults = {
        identifier: landlordWallet!.identifier,
        landlord: {
          identifier: landlordWallet!.landlord.identifier,
          name: landlordWallet!.landlord.name,
          address: landlordWallet!.landlord.address,
        },
        wallet_account_number: landlordWallet!.walletAccountNumber,
        wallet_balance: landlordWallet!.walletBalance,
        total_inflow: landlordWallet!.totalInflow,
        total_outflow: landlordWallet!.totalOutflow,
        provider_account_number: landlordWallet!.providerAccountNumber || NOT_APPLICABLE,
        provider_account_name: landlordWallet!.providerAccountName || NOT_APPLICABLE,
        provider_bank_name: landlordWallet!.providerBankName || NOT_APPLICABLE,
      }

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: WALLET_DETAILS_FETCH_SUCCESSFUL,
        results: mutatedLandlordWalletResults,
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
