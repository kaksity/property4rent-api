import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LandlordActions from 'App/Actions/LandlordActions'
import SubscriptionPlanActions from 'App/Actions/SubscriptionPlanActions'
import Landlord from 'App/Models/Landlord'

export default class extends BaseSeeder {
  public async run() {
    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Landlord.truncate(true)

    const subscriptionPlan = await SubscriptionPlanActions.getSubscriptionPlanRecord({
      identifierType: 'id',
      identifier: 1,
    })

    await LandlordActions.createLandlordRecord({
      createPayload: {
        name: 'ABC Property Management',
        address: 'Test Address',
        mutatedName: 'abc_property_management',
        subscriptionPlanId: subscriptionPlan!.id,
      },
      dbTransactionOptions: {
        useTransaction: false,
      },
    })

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
