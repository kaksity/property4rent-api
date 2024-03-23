import {
  column,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import Landlord from 'App/Models/Landlord'
import HouseInformation from 'App/Models/HouseInformation'
import HouseUnit from 'App/Models/HouseUnit'

export default class House extends AbstractModel {
  @column()
  public landlordId: number

  @column()
  public description: string

  @column({
    consume: (value) => (value === 1 ? 'Yes' : 'No'),
  })
  public canViewInPublic: boolean | string

  @belongsTo(() => Landlord)
  public landlord: BelongsTo<typeof Landlord>

  @hasOne(() => HouseInformation, {
    foreignKey: 'houseId',
  })
  public information: HasOne<typeof HouseInformation>

  @hasMany(() => HouseUnit)
  public units: HasMany<typeof HouseUnit>
}
