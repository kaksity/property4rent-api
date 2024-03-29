import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('fetch/tenants/house-units/rents', 'FetchTenantHouseUnitRentsController').as(
    'admin.v1.rent-management.house.fetch-tenant-house-unit-rents'
  )
})
  .prefix('api/v1/admin/rent-management/house')
  .namespace('App/Controllers/Http/Admin/V1/RentManagement/House')

Route.group(function () {})
  .prefix('api/v1/admin/rent-management/shop')
  .namespace('App/Controllers/Http/Admin/V1/RentManagement/Shop')
