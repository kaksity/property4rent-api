import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SettingsState from 'App/Systems/Settings/Location/Models/SettingsState'
export default class StateSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const statesData = [
      {
        countryId: 1,
        stateLabel: 'Abia',
      },
      {
        countryId: 1,
        stateLabel: 'Adamawa',
      },
      {
        countryId: 1,
        stateLabel: 'Akwa Ibom',
      },
      {
        countryId: 1,
        stateLabel: 'Anambra',
      },
      {
        countryId: 1,
        stateLabel: 'Bauchi',
      },
      {
        countryId: 1,
        stateLabel: 'Bayelsa',
      },
      {
        countryId: 1,
        stateLabel: 'Benue',
      },
      {
        countryId: 1,
        stateLabel: 'Borno',
      },
      {
        countryId: 1,
        stateLabel: 'Cross Rivers',
      },
      {
        countryId: 1,
        stateLabel: 'Delta',
      },
      {
        countryId: 1,
        stateLabel: 'Ebonyi',
      },
      {
        countryId: 1,
        stateLabel: 'Edo',
      },
      {
        countryId: 1,
        stateLabel: 'Ekiti',
      },
      {
        countryId: 1,
        stateLabel: 'Enugu',
      },
      {
        countryId: 1,
        stateLabel: 'Federal Capital Territory',
      },
      {
        countryId: 1,
        stateLabel: 'Gombe',
      },
      {
        countryId: 1,
        stateLabel: 'Imo',
      },
      {
        countryId: 1,
        stateLabel: 'Jigawa',
      },
      {
        countryId: 1,
        stateLabel: 'Kaduna',
      },
      {
        countryId: 1,
        stateLabel: 'Kano',
      },
      {
        countryId: 1,
        stateLabel: 'Katsina',
      },
      {
        countryId: 1,
        stateLabel: 'Kebbi',
      },
      {
        countryId: 1,
        stateLabel: 'Kogi',
      },
      {
        countryId: 1,
        stateLabel: 'Kwara',
      },
      {
        countryId: 1,
        stateLabel: 'Lagos',
      },
      {
        countryId: 1,
        stateLabel: 'Nasarawa',
      },
      {
        countryId: 1,
        stateLabel: 'Niger',
      },
      {
        countryId: 1,
        stateLabel: 'Ogun',
      },
      {
        countryId: 1,
        stateLabel: 'Ondo',
      },
      {
        countryId: 1,
        stateLabel: 'Osun',
      },
      {
        countryId: 1,
        stateLabel: 'Oyo',
      },
      {
        countryId: 1,
        stateLabel: 'Plateau',
      },
      {
        countryId: 1,
        stateLabel: 'Rivers',
      },
      {
        countryId: 1,
        stateLabel: 'Sokoto',
      },
      {
        countryId: 1,
        stateLabel: 'Taraba',
      },
      {
        countryId: 1,
        stateLabel: 'Yobe',
      },
      {
        countryId: 1,
        stateLabel: 'Zamfara',
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await SettingsState.truncate(true)
    await SettingsState.createMany(statesData)

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
