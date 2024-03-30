import './Http'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', function ({ view }) {
  return view.render('emails/welcome_landlord_email_template')
})
