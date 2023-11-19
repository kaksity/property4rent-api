import LandlordFactory from 'App/Models/Landlord'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(LandlordFactory, ({ faker }) => {
  return {
    firstName: faker.person.firstName(),

    lastName: faker.person.lastName(),

    phoneNumber: faker.phone.number(),

    email: faker.internet.email(),

    password: 'password123',
  }
}).build()
