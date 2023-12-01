import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import SettingsState from 'App/Models/SettingsState'
import SettingsLga from 'App/Models/SettingsLga'

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

  @column()
  public length: number

  @column()
  public breadth: number

  @column()
  public baseAmount: number

  @column()
  public minimumAmount: number

  @column()
  public maximumAmount: number

  @column()
  public possibleUseCases: string

  @belongsTo(() => SettingsState)
  public state: BelongsTo<typeof SettingsState>

  @belongsTo(() => SettingsLga)
  public lga: BelongsTo<typeof SettingsLga>
}
