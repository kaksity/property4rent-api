import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import SettingsState from 'App/Models/SettingsState'
import SettingsLga from 'App/Models/SettingsLga'
import Shop from 'App/Models/Shop'

export default class ShopInformation extends AbstractModel {
  @column()
  public shopId: number

  @column()
  public stateId: number

  @column()
  public lgaId: number

  @column()
  public area: string

  @column()
  public nearestLandmark: string

  @column()
  public longitude: string

  @column()
  public latitude: string

  @belongsTo(() => SettingsState, {
    foreignKey: 'stateId',
  })
  public state: BelongsTo<typeof SettingsState>

  @belongsTo(() => SettingsLga, {
    foreignKey: 'lgaId',
  })
  public lga: BelongsTo<typeof SettingsLga>

  @belongsTo(() => Shop)
  public shop: BelongsTo<typeof Shop>
}
