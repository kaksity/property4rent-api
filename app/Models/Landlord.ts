import { beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'

export default class Landlord extends AbstractModel {
  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public phoneNumber: string

  @column()
  public email: string

  @column({
    consume: (value) => value === 1 ? 'Yes' : 'No' 
  })
  public hasActivatedAccount: boolean | string

  @column({
    consume: (value) => value === 1 ? 'Yes' : 'No' 
  })
  public isAccountLocked: boolean | string

  @column({
    consume: (value) => value === 1 ? 'Yes' : 'No' 
  })
  public isAccountVerified: boolean | string

  @column.dateTime()
  public lastLoginDate: DateTime


  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @beforeSave()
  public static async hashPassword(landlord: Landlord) {
    if (landlord.$dirty.password) {
      landlord.password = await Hash.make(landlord.password)
    }
  }
}
