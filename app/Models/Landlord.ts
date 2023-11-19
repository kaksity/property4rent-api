import { beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Landlord extends AbstractModel {
  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public phoneNumber: string

  @column()
  public email: string

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
