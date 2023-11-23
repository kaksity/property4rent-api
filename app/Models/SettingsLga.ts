import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import SettingsState from 'App/Models/SettingsState'

export default class SettingsLga extends AbstractModel {
  @column()
  public lgaLabel: string

  @column()
  public stateId: number

  @belongsTo(() => SettingsState, {
    localKey: 'id',
    foreignKey: 'stateId',
  })
  public state: BelongsTo<typeof SettingsState>
}
