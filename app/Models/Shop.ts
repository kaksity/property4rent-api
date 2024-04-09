import {
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import ShopInformation from 'App/Models/ShopInformation'
import Landlord from 'App/Models/Landlord'
import ShopUnit from 'App/Models/ShopUnit'

export default class Shop extends AbstractModel {
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

  @hasOne(() => ShopInformation, {
    foreignKey: 'shopId',
  })
  public information: HasOne<typeof ShopInformation>

  @hasMany(() => ShopUnit)
  public units: HasMany<typeof ShopUnit>
}
