import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('set/wallet-pin', 'SetWalletPinController').as(
    'landlord.v1.wallet-management.set-wallet-pin'
  )
  Route.get('fetch/wallet-details', 'FetchWalletDetailsController').as(
    'landlord.v1.wallet-management.fetch-wallet-details'
  )
})
  .middleware('auth:landlordTeamMember')
  .middleware('checkForCompleteLandlordTeamMemberAccountSetup')
  .prefix('api/v1/landlord/wallet-management')
  .namespace('App/Controllers/Http/Landlord/V1/WalletManagement')
