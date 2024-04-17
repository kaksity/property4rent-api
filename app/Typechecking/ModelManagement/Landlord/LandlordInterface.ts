import { DateTime } from 'luxon'

interface LandlordInterface {
  name: string

  mutatedName: string

  address: string

  subscriptionPlanId: number

  isSubscription: boolean

  hasPaidSubscriptionFee: boolean

  startSubscriptionDate: DateTime

  endSubscriptionDate: DateTime
}

export default LandlordInterface
