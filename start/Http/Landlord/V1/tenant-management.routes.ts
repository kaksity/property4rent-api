import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.get('fetch/tenant/:emailAddress/email', 'GetTenantByEmailAddressController').as(
    'landlord.v1.tenant-management.get-tenant-by-email-address'
  )
})
  .middleware('auth:landlord')
  .prefix('api/v1/landlord/tenant-management')
  .namespace('App/Controllers/Http/Landlord/V1/TenantManagement')
