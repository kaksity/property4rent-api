import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.get('fetch/tenants/house-units/rents', 'FetchTenantHouseUnitRentsController').as(
    'tenant.v1.rent-management.house.fetch-tenant-house-unit-rents'
  )
})
  .prefix('api/v1/tenant/rent-management/house')
  .middleware('auth:tenant')
  .middleware('checkForCompleteTenantAccountSetup')
  .namespace('App/Controllers/Http/Tenant/V1/RentManagement/House')

Route.group(function () {})
  .prefix('api/v1/tenant/rent-management/shop')
  .middleware('auth:tenant')
  .middleware('checkForCompleteTenantAccountSetup')
  .namespace('App/Controllers/Http/Tenant/V1/RentManagement/Shop')

// /api/v1/tenant/rent-management/house/fetch/tenants/house-units/rents
// /api/v1/tenant/rent-management/house/fetch/tenants/house-units/rents
