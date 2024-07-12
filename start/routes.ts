import './Http'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', function ({ response }) {
  return response.ok({
    message: 'Welcome to property4rent api',
  })
})
