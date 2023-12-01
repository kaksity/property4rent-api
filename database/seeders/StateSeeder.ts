import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SettingsState from 'App/Models/SettingsState'
export default class StateSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const statesData = [
      {
        stateLabel: 'Abia',
      },
      {
        stateLabel: 'Adamawa',
      },
      {
        stateLabel: 'Akwa Ibom',
      },
      {
        stateLabel: 'Anambra',
      },
      {
        stateLabel: 'Bauchi',
      },
      {
        stateLabel: 'Bayelsa',
      },
      {
        stateLabel: 'Benue',
      },
      {
        stateLabel: 'Borno',
      },
      {
        stateLabel: 'Cross Rivers',
      },
      {
        stateLabel: 'Delta',
      },
      {
        stateLabel: 'Ebonyi',
      },
      {
        stateLabel: 'Edo',
      },
      {
        stateLabel: 'Ekiti',
      },
      {
        stateLabel: 'Enugu',
      },
      {
        stateLabel: 'Federal Capital Territory',
      },
      {
        stateLabel: 'Gombe',
      },
      {
        stateLabel: 'Imo',
      },
      {
        stateLabel: 'Jigawa',
      },
      {
        stateLabel: 'Kaduna',
      },
      {
        stateLabel: 'Kano',
      },
      {
        stateLabel: 'Katsina',
      },
      {
        stateLabel: 'Kebbi',
      },
      {
        stateLabel: 'Kogi',
      },
      {
        stateLabel: 'Kwara',
      },
      {
        stateLabel: 'Lagos',
      },
      {
        stateLabel: 'Nasarawa',
      },
      {
        stateLabel: 'Niger',
      },
      {
        stateLabel: 'Ogun',
      },
      {
        stateLabel: 'Ondo',
      },
      {
        stateLabel: 'Osun',
      },
      {
        stateLabel: 'Oyo',
      },
      {
        stateLabel: 'Plateau',
      },
      {
        stateLabel: 'Rivers',
      },
      {
        stateLabel: 'Sokoto',
      },
      {
        stateLabel: 'Taraba',
      },
      {
        stateLabel: 'Yobe',
      },
      {
        stateLabel: 'Zamfara',
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await SettingsState.truncate(true)
    await SettingsState.createMany(statesData)

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
