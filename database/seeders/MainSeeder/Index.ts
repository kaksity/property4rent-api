import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../StateSeeder'))
    await this.runSeeder(await import('../LgaSeeder'))
    await this.runSeeder(await import('../SubscriptionPlanSeeder'))
    await this.runSeeder(await import('../AdminSeeder'))
    await this.runSeeder(await import('../LandlordSeeder'))
    await this.runSeeder(await import('../LandlordTeamMemberSeeder'))
    await this.runSeeder(await import('../TenantSeeder'))
  }
}
