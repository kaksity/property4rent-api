import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import Tenant from 'App/Models/Tenant'

export default class TenantWallet extends AbstractModel {
  @column()
  public tenantId: number

  @column()
  public walletAccountNumber: string

  @column()
  public walletPin: string

  @column()
  public walletBalance: number

  @column()
  public totalInflow: number

  @column()
  public totalOutflow: number

  @column()
  public providerAccountNumber: string | null

  @column()
  public providerAccountName: string | null

  @column()
  public providerBankName: string | null

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>
}
