import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LandlordActions from 'App/Actions/LandlordActions'
import { NULL_OBJECT } from 'App/Helpers/Messages/SystemMessage'
import Tenant from 'App/Models/Tenant'

export default class extends BaseSeeder {
  public async run() {
    const password = 'password123'

    let landlord = await LandlordActions.getLandlordRecord({
      identifierType: 'id',
      identifier: 1,
    })

    if (landlord === NULL_OBJECT) {
      landlord = await LandlordActions.createLandlordRecord({
        createPayload: {
          firstName: 'Yusuf',
          lastName: 'Musa',
          phoneNumber: '09012325678',
          email: 'yusuf.musa@example.com',
          password,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })
    }

    const tenants = [
      {
        firstName: 'Chinedu',
        lastName: 'Okoro',
        phoneNumber: '08012345678',
        email: 'chinedu.okoro@example.com',
        hasActivatedAccount: true,
        password,
        createdByLandlordId: landlord.id,
      },
      {
        firstName: 'Aisha',
        lastName: 'Abubakar',
        phoneNumber: '08123456789',
        email: 'aisha.abubakar@example.com',
        hasActivatedAccount: true,
        password,
        createdByLandlordId: landlord.id,
      },
      {
        firstName: 'Tunde',
        lastName: 'Okafor',
        phoneNumber: '09098765432',
        email: 'tunde.okafor@example.com',
        hasActivatedAccount: true,
        password,
        createdByLandlordId: landlord.id,
      },
      {
        firstName: 'Fatima',
        lastName: 'Bello',
        phoneNumber: '07087654321',
        email: 'fatima.bello@example.com',
        hasActivatedAccount: true,
        password,
        createdByLandlordId: landlord.id,
      },
      {
        firstName: 'Kunle',
        lastName: 'Adams',
        phoneNumber: '09123456789',
        email: 'kunle.adams@example.com',
        hasActivatedAccount: true,
        password,
        createdByLandlordId: landlord.id,
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Tenant.truncate(true)
    await Tenant.createMany(tenants)
    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
