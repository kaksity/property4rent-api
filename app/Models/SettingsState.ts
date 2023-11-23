import { HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import SettingsLga from 'App/Models/SettingsLga'

export default class SettingsState extends AbstractModel {
  @column()
  public stateLabel: string

  @hasMany(() => SettingsLga)
  public lgas: HasMany<typeof SettingsLga>
}
