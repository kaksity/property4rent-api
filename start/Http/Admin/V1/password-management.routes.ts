import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('request-otp-token', 'RequestPasswordResetOtpTokenController').as(
    'admin.v1.password-management.reset-password.request-otp-token'
  )
  Route.post('verify-otp-token', 'VerifyPasswordResetOtpTokenController').as(
    'admin.v1.password-management.reset-password.verify-otp-token'
  )
})
  .prefix('api/v1/admin/password-management/reset-password')
  .namespace('App/Controllers/Http/Admin/V1/PasswordManagement/ResetPassword')
