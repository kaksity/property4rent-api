import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Tenant from 'App/Models/Tenant'
import HouseUnit from 'App/Models/HouseUnit'
import AbstractModel from 'App/Models/AbstractModel'

export default class TenantHouseRent extends AbstractModel {
  @column()
  public tenantId: number

  @column()
  public houseUnitId: number

  @column()
  public houseRentAmount: number

  @column()
  public paidRentAmount: number

  @column()
  public startRentDate: DateTime

  @column()
  public endRentDate: DateTime

  @column()
  public rentStatus: 'active' | 'inactive' | 'expired'

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => HouseUnit)
  public houseUnit: BelongsTo<typeof HouseUnit>
}
