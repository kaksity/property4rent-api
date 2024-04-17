import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class MainSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    console.log('Main Seeder')
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (
      (!Seeder.default.environment.includes('development') && Application.inDev) ||
      (!Seeder.default.environment.includes('testing') && Application.inTest) ||
      (!Seeder.default.environment.includes('production') && Application.inProduction)
    ) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('./StateSeeder'))
    await this.runSeeder(await import('./LgaSeeder'))
    await this.runSeeder(await import('./SubscriptionPlanSeeder'))
    await this.runSeeder(await import('./AdminSeeder'))
    await this.runSeeder(await import('./LandlordSeeder'))
    await this.runSeeder(await import('./TenantSeeder'))
  }
}
