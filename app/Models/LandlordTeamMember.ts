import { beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import Landlord from 'App/Models/Landlord'

export default class LandlordTeamMember extends AbstractModel {
  @column()
  public landlordId: number

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

  @column()
  public role: 'owner' | 'member'

  @column.dateTime()
  public lastLoginDate: DateTime

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @belongsTo(() => Landlord)
  public landlord: BelongsTo<typeof Landlord>

  @beforeSave()
  public static async hashPassword(landlordTeamMember: LandlordTeamMember) {
    if (landlordTeamMember.$dirty.password) {
      landlordTeamMember.password = await Hash.make(landlordTeamMember.password)
    }
  }
}
