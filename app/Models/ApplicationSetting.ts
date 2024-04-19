import { column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'

export default class ApplicationSetting extends AbstractModel {
  @column()
  public initialLandlordWalletBalance: number
}
