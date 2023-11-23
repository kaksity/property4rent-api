import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.get('states',
    'FetchStateListController'
  ).as('landlord.v1.general.fetch-states')
  Route.get(
    'lgas',
    'FetchLgaListController'
  ).as('landlord.v1.general.fetch-lgas')
})
  .prefix('api/v1/landlord/general')
  .namespace('App/Controllers/Http/Landlord/V1/General')
