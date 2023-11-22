import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.get('/fetch/single/:landlordIdentifier', 'FetchSingleLandlordAccountController')
  Route.get('/fetch/all', 'ListLandlordAccountsController')
  Route.patch('/verify/:landlordIdentifier', 'VerifyLandlordAccountController')
  Route.patch('/lock/:landlordIdentifier', 'LockLandlordAccountController')
  Route.patch('/unlock/:landlordIdentifier', 'UnlockLandlordAccountController')
})
  .prefix('api/v1/admin/landlord-management')
  .middleware('auth:admin')
  .namespace('App/Controllers/Http/Admin/V1/LandlordManagement')
