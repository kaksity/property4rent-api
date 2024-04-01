import { beforeSave, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'

export default class Tenant extends AbstractModel {
  @column()
  public createdByLandlordId: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public phoneNumber: string

  @column()
  public email: string

  @column({
    consume: (value) => (value === 1 ? 'Yes' : 'No'),
  })
  public hasActivatedAccount: boolean | string

  @column({
    consume: (value) => (value === 1 ? 'Yes' : 'No'),
  })
  public isAccountLocked: boolean | string

  @column({
    consume: (value) => (value === 1 ? 'Yes' : 'No'),
  })
  public isAccountVerified: boolean | string

  @column.dateTime()
  public lastLoginDate: DateTime

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @belongsTo(() => Tenant, {
    foreignKey: 'createdByLandlordId',
  })
  public createdByLandlord: BelongsTo<typeof Tenant>

  @beforeSave()
  public static async hashPassword(tenant: Tenant) {
    if (tenant.$dirty.password) {
      tenant.password = await Hash.make(tenant.password)
    }
  }
}
