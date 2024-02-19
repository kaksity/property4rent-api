import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('request-otp-token', 'RequestPasswordResetOtpTokenController').as(
    'tenant.v1.password-management.reset-password.request-otp-token'
  )
  Route.post('verify-otp-token', 'VerifyPasswordResetOtpTokenController').as(
    'tenant.v1.password-management.reset-password.verify-otp-token'
  )
})
  .prefix('api/v1/tenant/password-management/reset-password')
  .namespace('App/Controllers/Http/Tenant/V1/PasswordManagement/ResetPassword')

Route.group(function () {
  Route.post('/', 'ChangePasswordController').as('tenant.v1.password-management.change-password')
})
  .middleware('auth:tenant')
  .prefix('api/v1/tenant/password-management/change-password')
  .namespace('App/Controllers/Http/Tenant/V1/PasswordManagement/ChangePassword')
