import AdminFactory from 'App/Models/Admin'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(AdminFactory, ({ faker }) => {
  return {
  firstName: faker.person.firstName(),

  lastName: faker.person.lastName(),

  phoneNumber: faker.phone.number(),

  email: faker.internet.email(),

  password: 'password123'
  }
}).build()
