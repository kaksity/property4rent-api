import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Shop from 'App/Models/Shop'
import AbstractModel from 'App/Models/AbstractModel'
import Tenant from 'App/Models/Tenant'

export default class TenantShopRent extends AbstractModel {
  @column()
  public tenantId: number

  @column()
  public shopId: number

  @column()
  public totalRentToPay: number

  @column()
  public rentAmountPaid: number

  @column()
  public hasPaidRent: boolean

  @column()
  public nextDueRentDate: DateTime

  @belongsTo(() => Shop)
  public shop: BelongsTo<typeof Shop>

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>
}
