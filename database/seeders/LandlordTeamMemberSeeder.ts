import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LandlordActions from 'App/Actions/LandlordActions'
import LandlordTeamMember from 'App/Models/LandlordTeamMember'

export default class extends BaseSeeder {
  public async run() {
    const password = 'password123'

    const landlord = await LandlordActions.getLandlordRecord({
      identifierType: 'id',
      identifier: 1,
    })

    const landlordTeamMembers = [
      {
        firstName: 'Chinedu',
        lastName: 'Okoro',
        phoneNumber: '08012345678',
        email: 'chinedu.okoro@example.com',
        hasActivatedAccount: true,
        password,
        landlordId: landlord!.id,
      },
      {
        firstName: 'Aisha',
        lastName: 'Abubakar',
        phoneNumber: '08123456789',
        email: 'aisha.abubakar@example.com',
        hasActivatedAccount: true,
        password,
        landlordId: landlord!.id,
      },
      {
        firstName: 'Tunde',
        lastName: 'Okafor',
        phoneNumber: '09098765432',
        email: 'tunde.okafor@example.com',
        hasActivatedAccount: true,
        password,
        landlordId: landlord!.id,
      },
      {
        firstName: 'Fatima',
        lastName: 'Bello',
        phoneNumber: '07087654321',
        email: 'fatima.bello@example.com',
        hasActivatedAccount: true,
        password,
        landlordId: landlord!.id,
      },
      {
        firstName: 'Kunle',
        lastName: 'Adams',
        phoneNumber: '09123456789',
        email: 'kunle.adams@example.com',
        hasActivatedAccount: true,
        password,
        landlordId: landlord!.id,
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await LandlordTeamMember.truncate(true)
    await LandlordTeamMember.createMany(landlordTeamMembers)
    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
