import { column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import { DateTime } from 'luxon'

export default class OtpToken extends AbstractModel {
  @column()
  public authorId: number

  @column()
  public purpose: string

  @column()
  public token: string

  @column.dateTime()
  public expiresAt: DateTime
}
