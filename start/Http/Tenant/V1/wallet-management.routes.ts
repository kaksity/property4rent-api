import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('set/wallet-pin', 'SetWalletPinController').as(
    'tenant.v1.wallet-management.set-wallet-pin'
  )
  Route.get('fetch/wallet-details', 'FetchWalletDetailsController').as(
    'tenant.v1.wallet-management.fetch-wallet-details'
  )
})
  .middleware('auth:tenant')
  .middleware('checkForCompleteTenantAccountSetup')
  .prefix('api/v1/tenant/wallet-management')
  .namespace('App/Controllers/Http/Tenant/V1/WalletManagement')
