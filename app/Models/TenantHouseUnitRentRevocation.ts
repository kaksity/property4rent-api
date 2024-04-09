import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tenant from 'App/Models/Tenant'
import HouseUnit from 'App/Models/HouseUnit'
import Landlord from 'App/Models/Landlord'
import AbstractModel from 'App/Models/AbstractModel'

export default class TenantHouseUnitRentRevocation extends AbstractModel {
  @column()
  public landlordId: number

  @column()
  public tenantId: number

  @column()
  public houseUnitId: number

  @column()
  public reason: string

  @column()
  public status: 'pending' | 'approved' | 'rejected'

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => HouseUnit)
  public houseUnit: BelongsTo<typeof HouseUnit>

  @belongsTo(() => Landlord)
  public landlord: BelongsTo<typeof Landlord>
}
