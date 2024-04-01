import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post(
    'assigned/tenant/:tenantIdentifier/house-unit/:houseUnitIdentifier',
    'AssignTenantToHouseUnitController'
  ).as('landlord.v1.rent-management.shop.assigned-tenant-to-house-unit')
  Route.post(
    'revoke/tenant/:tenantIdentifier/house-unit/:houseUnitIdentifier',
    'RevokeTenantFromHouseUnitController'
  ).as('landlord.v1.rent-management.shop.revoke-tenant-from-house-unit')
  Route.get('fetch/tenants/house-units/rents', 'FetchTenantHouseUnitRentsController').as(
    'landlord.v1.rent-management.shop.fetch-tenant-house-unit-rents'
  )
})
  .prefix('api/v1/landlord/rent-management/house')
  .namespace('App/Controllers/Http/Landlord/V1/RentManagement/House')

Route.group(function () {})
  .prefix('api/v1/landlord/rent-management/shop')
  .middleware('auth:landlord')
  .middleware('checkForCompleteLandlordAccountSetup')
  .namespace('App/Controllers/Http/Landlord/V1/RentManagement/Shop')
