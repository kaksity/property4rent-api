import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('login', 'AdminLoginController').as('admin.v1.admin-login')
})
  .prefix('api/v1/admin/authentication')
  .namespace('App/Controllers/Http/Admin/V1/Authentication')
