import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('create/tenant', 'CreateNewTenantController').as(
    'landlord.v1.tenant-management.create-tenant-account'
  )
  Route.get('fetch/tenant/:emailAddress/email', 'GetTenantByEmailAddressController').as(
    'landlord.v1.tenant-management.get-tenant-by-email-address'
  )
  Route.post(
    'assigned/tenant/:tenantIdentifier/house-unit/:houseUnitIdentifier',
    'AssignTenantToHouseUnitController'
  ).as('landlord.v1.tenant-management.assigned-tenant-to-house-unit')
  Route.post(
    'revoke/tenant/:tenantIdentifier/house-unit/:houseUnitIdentifier',
    'RevokeTenantFromHouseUnitController'
  ).as('landlord.v1.tenant-management.revoke-tenant-from-house-unit')
  Route.post('fetch/tenants/house-units/rents', 'FetchTenantHouseUnitRentsController').as(
    'landlord.v1.tenant-management.fetch-tenant-house-unit-rents'
  )
})
  .middleware('auth:landlord')
  .prefix('api/v1/landlord/tenant-management')
  .namespace('App/Controllers/Http/Landlord/V1/TenantManagement')
