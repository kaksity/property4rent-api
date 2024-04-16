import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.get('fetch/states', 'FetchStateListController').as('landlord.v1.general.fetch-states')
  Route.get('fetch/lgas', 'FetchLgaListController').as('landlord.v1.general.fetch-lgas')
  Route.get('fetch/subscription-plans', 'FetchSubscriptionPlansController').as(
    'landlord.v1.general.fetch-subscription-plans'
  )
})
  .prefix('api/v1/landlord/general')
  .namespace('App/Controllers/Http/Landlord/V1/General')
