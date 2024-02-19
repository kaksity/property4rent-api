import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('login', 'TenantLoginController').as('tenant.v1.authentication.login')
})
  .prefix('api/v1/tenant/authentication')
  .namespace('App/Controllers/Http/Tenant/V1/Authentication')
