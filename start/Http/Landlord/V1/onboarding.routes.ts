import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('register', 'CreateNewLandlordController').as('landlord.v1.landlord-registration')
})
  .prefix('api/v1/landlord/onboarding')
  .namespace('App/Controllers/Http/Landlord/V1/Onboarding')
