import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Tenant from 'App/Models/Tenant'
import ShopUnit from 'App/Models/ShopUnit'
import Landlord from 'App/Models/Landlord'
import AbstractModel from 'App/Models/AbstractModel'

export default class TenantShopUnitRent extends AbstractModel {
  @column()
  public landlordId: number

  @column()
  public tenantId: number

  @column()
  public shopUnitId: number

  @column()
  public shopRentAmount: number

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

  @belongsTo(() => ShopUnit)
  public shopUnit: BelongsTo<typeof ShopUnit>

  @belongsTo(() => Landlord)
  public landlord: BelongsTo<typeof Landlord>
}
