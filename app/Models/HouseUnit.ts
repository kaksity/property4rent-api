import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import House from 'App/Models/House'

export default class HouseUnit extends AbstractModel {
  @column()
  public houseId: number

  @column()
  public houseUnitType: 'Flat' | 'Apartment'

  @column()
  public numberOfRooms: number

  @column()
  public numberOfBathrooms: number

  @column()
  public numberOfKitchens: number

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
  public occupationStatus: 'occupied' | 'empty'

  @column()
  public possibleSuitableTenants: string

  @belongsTo(() => House)
  public house: BelongsTo<typeof House>
}
