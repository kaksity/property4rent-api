import { column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import SettingsLga from 'App/Models/SettingsLga'
import SettingsState from 'App/Models/SettingsState'
import House from 'App/Models/House'

export default class HouseInformation extends AbstractModel {
  @column()
  public houseId: number

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

  @belongsTo(() => SettingsState, {
    foreignKey: 'stateId',
  })
  public state: BelongsTo<typeof SettingsState>

  @belongsTo(() => SettingsLga, {
    foreignKey: 'lgaId',
  })
  public lga: BelongsTo<typeof SettingsLga>

  @belongsTo(() => House)
  public house: BelongsTo<typeof House>
}
