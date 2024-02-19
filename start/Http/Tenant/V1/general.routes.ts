import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.get('states', 'FetchStateListController').as('tenant.v1.general.fetch-states')
  Route.get('lgas', 'FetchLgaListController').as('tenant.v1.general.fetch-lgas')
})
  .prefix('api/v1/tenant/general')
  .namespace('App/Controllers/Http/Tenant/V1/General')
