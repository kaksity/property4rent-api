import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('fetch/tenants/house-units/rents', 'FetchTenantHouseUnitRentsController').as(
    'tenant.v1.rent-management.fetch-tenant-house-unit-rents'
  )
})
  .prefix('api/v1/tenant/rent-management')
  .namespace('App/Controllers/Http/Tenant/V1/RentManagement')
