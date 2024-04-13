import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('register', 'CreateNewTenantController').as('tenant.v1.onboarding.register')
  Route.post(
    'account-activation/request-otp-token',
    'RequestAccountActivationOtpTokenController'
  ).as('tenant.v1.onboarding.request-account-activation-otp-token')
  Route.post(
    'account-activation/verify-otp-token',
    'VerifyAccountVerificationOtpTokenController'
  ).as('tenant.v1.onboarding.verify-account-activation-otp-token')
})
  .prefix('api/v1/tenant/onboarding')
  .namespace('App/Controllers/Http/Tenant/V1/Onboarding')
