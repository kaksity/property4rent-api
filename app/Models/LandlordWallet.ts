import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import Landlord from 'App/Models/Landlord'

export default class LandlordWallet extends AbstractModel {
  @column()
  public landlordId: number

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

  @belongsTo(() => Landlord)
  public landlord: BelongsTo<typeof Landlord>
}
