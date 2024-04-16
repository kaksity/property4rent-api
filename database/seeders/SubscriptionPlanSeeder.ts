import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SubscriptionPlan from 'App/Models/SubscriptionPlan'

export default class extends BaseSeeder {
  public async run() {
    const subscriptionPlans = [
      {
        name: 'Free',
        price: 0,
        duration: 0,
        durationType: 'Months',
      },
      {
        name: 'Basic',
        price: 100000,
        duration: 6,
        durationType: 'Months',
      },
      {
        name: 'Pro',
        price: 150000,
        duration: 12,
        durationType: 'Months',
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await SubscriptionPlan.truncate(true)
    await SubscriptionPlan.createMany(subscriptionPlans)
    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
