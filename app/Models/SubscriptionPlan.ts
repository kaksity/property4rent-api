import { column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'

export default class SubscriptionPlan extends AbstractModel {
  @column()
  public name: string

  @column()
  public price: number

  @column()
  public duration: number

  @column()
  public durationType: string
}
