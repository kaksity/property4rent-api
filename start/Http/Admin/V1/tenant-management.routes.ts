import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.get('/fetch/single/:tenantIdentifier', 'FetchSingleTenantAccountController')
  Route.get('/fetch/all', 'ListTenantAccountsController')
  Route.patch('/verify/:tenantIdentifier', 'VerifyTenantAccountController')
  Route.patch('/lock/:tenantIdentifier', 'LockTenantAccountController')
  Route.patch('/unlock/:tenantIdentifier', 'UnlockTenantAccountController')
})
  .prefix('api/v1/admin/tenant-management')
  .middleware('auth:admin')
  .namespace('App/Controllers/Http/Admin/V1/TenantManagement')
