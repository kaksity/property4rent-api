import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Landlord from 'App/Models/Landlord'

export default class extends BaseSeeder {
  public async run() {
    const password = 'password123'
    const landlords = [
      {
        firstName: 'Chinedu',
        lastName: 'Okoro',
        phoneNumber: '08012345678',
        email: 'chinedu.okoro@example.com',
        hasActivatedAccount: true,
        password,
      },
      {
        firstName: 'Aisha',
        lastName: 'Abubakar',
        phoneNumber: '08123456789',
        email: 'aisha.abubakar@example.com',
        hasActivatedAccount: true,
        password,
      },
      {
        firstName: 'Tunde',
        lastName: 'Okafor',
        phoneNumber: '09098765432',
        email: 'tunde.okafor@example.com',
        hasActivatedAccount: true,
        password,
      },
      {
        firstName: 'Fatima',
        lastName: 'Bello',
        phoneNumber: '07087654321',
        email: 'fatima.bello@example.com',
        hasActivatedAccount: true,
        password,
      },
      {
        firstName: 'Kunle',
        lastName: 'Adams',
        phoneNumber: '09123456789',
        email: 'kunle.adams@example.com',
        hasActivatedAccount: true,
        password,
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Landlord.truncate(true)
    await Landlord.createMany(landlords)
    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
