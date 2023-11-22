import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('request-otp-token', 'RequestPasswordResetOtpTokenController').as(
    'landlord.v1.password-management.reset-password.request-otp-token'
  )
  Route.post('verify-otp-token', 'VerifyPasswordResetOtpTokenController').as(
    'landlord.v1.password-management.reset-password.verify-otp-token'
  )
})
  .prefix('api/v1/landlord/password-management/reset-password')
  .namespace('App/Controllers/Http/Landlord/V1/PasswordManagement/ResetPassword')

Route.group(function () {
  Route.post('/', 'ChangePasswordController').as('landlord.v1.password-management.change-password')
})
  .middleware('auth:landlord')
  .prefix('api/v1/landlord/password-management/change-password')
  .namespace('App/Controllers/Http/Landlord/V1/PasswordManagement/ChangePassword')
