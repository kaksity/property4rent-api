import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import Shop from 'App/Models/Shop'

export default class ShopUnit extends AbstractModel {
  @column()
  public shopId: number

  @column()
  public numberOfRooms: number

  @column()
  public numberOfToilets: number

  @column()
  public length: number

  @column()
  public breadth: number

  @column()
  public baseRentAmount: number

  @column()
  public minimumRentAmount: number

  @column()
  public maximumRentAmount: number

  @column()
  public possibleUseCases: string

  @column()
  public occupationStatus: 'occupied' | 'empty'

  @belongsTo(() => Shop)
  public shop: BelongsTo<typeof Shop>
}
