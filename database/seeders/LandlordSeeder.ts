import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LandlordActions from 'App/Actions/LandlordActions'
import Landlord from 'App/Models/Landlord'

export default class extends BaseSeeder {
  public async run() {
    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Landlord.truncate(true)

    await LandlordActions.createLandlordRecord({
      createPayload: {
        name: 'ABC Property Management',
        address: 'Test Address',
        mutatedName: 'abc_property_management',
      },
      dbTransactionOptions: {
        useTransaction: false,
      },
    })

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
