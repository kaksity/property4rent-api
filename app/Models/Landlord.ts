import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import { DateTime } from 'luxon'
import LandlordTeamMember from 'App/Models/LandlordTeamMember'

export default class Landlord extends AbstractModel {
  @column()
  public name: string

  @column()
  public mutatedName: string

  @column()
  public address: string

  @column()
  public subscriptionPlanId: number

  @column({
    consume: (value) => (value === 1 ? 'Yes' : 'No'),
  })
  public isSubscription: boolean

  @column({
    consume: (value) => (value === 1 ? 'Yes' : 'No'),
  })
  public hasPaidSubscriptionFee: boolean

  @column()
  public startSubscriptionDate: DateTime

  @column()
  public endSubscriptionDate: DateTime

  @hasMany(() => LandlordTeamMember)
  public landlordTeamMembers: HasMany<typeof LandlordTeamMember>
}
