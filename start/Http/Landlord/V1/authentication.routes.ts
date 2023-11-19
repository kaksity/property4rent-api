import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('login', 'LandlordLoginController').as('landlord.v1.landlord-login')
})
  .prefix('api/v1/landlord/authentication')
  .namespace('App/Controllers/Http/Landlord/V1/Authentication')
