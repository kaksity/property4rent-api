import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('register', 'CreateNewLandlordController').as('landlord.v1.onboarding.register')
  Route.post(
    'account-activation/request-otp-token',
    'RequestAccountActivationOtpTokenController'
  ).as('landlord.v1.onboarding.request-account-activation-otp-token')
  Route.post(
    'account-activation/verify-otp-token',
    'VerifyAccountVerificationOtpTokenController'
  ).as('landlord.v1.onboarding.verify-account-activation-otp-token')
})
  .prefix('api/v1/landlord/onboarding')
  .namespace('App/Controllers/Http/Landlord/V1/Onboarding')
