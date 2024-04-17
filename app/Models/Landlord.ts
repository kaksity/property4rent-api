import { column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'

export default class Landlord extends AbstractModel {
  @column()
  public name: string

  @column()
  public mutatedName: string

  @column()
  public address: string

  @column()
  public subscriptionPlanId: number
}
