import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tenant from 'App/Models/Tenant'
import ShopUnit from 'App/Models/ShopUnit'
import Landlord from 'App/Models/Landlord'
import AbstractModel from 'App/Models/AbstractModel'

export default class TenantShopUnitRentRevocation extends AbstractModel {
  @column()
  public landlordId: number

  @column()
  public tenantId: number

  @column()
  public shopUnitId: number

  @column()
  public reason: string

  @column()
  public status: 'pending' | 'approved' | 'rejected'

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => ShopUnit)
  public shopUnit: BelongsTo<typeof ShopUnit>

  @belongsTo(() => Landlord)
  public landlord: BelongsTo<typeof Landlord>
}
