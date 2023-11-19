import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'

export default class extends BaseSeeder {
  public async run () {
    const password = 'password123'
    const admins = [
      {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '08012345678',
        email: 'johndoe@example.com',
        password,
      },
      {
        firstName: 'Alice',
        lastName: 'Smith',
        phoneNumber: '08123456789',
        email: 'alicesmith@example.com',
        password,
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        phoneNumber: '09098765432',
        email: 'mikejohnson@example.com',
        password,
      },
      {
        firstName: 'Emily',
        lastName: 'Brown',
        phoneNumber: '07087654321',
        email: 'emilybrown@example.com',
        password,
      },
      {
        firstName: 'David',
        lastName: 'Lee',
        phoneNumber: '09123456789',
        email: 'davidlee@example.com',
        password,
      }
    ];

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Admin.truncate(true)
    await Admin.createMany(admins)
    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')

  }
}
