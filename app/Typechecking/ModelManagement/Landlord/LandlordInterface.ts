import { DateTime } from 'luxon'

interface LandlordInterface {
  name: string

  mutatedName: string

  address: string

  subscriptionPlanId: number

  isSubscriptionPlanActive: boolean | string

  hasPaidSubscriptionFee: boolean | string

  startSubscriptionDate: DateTime

  endSubscriptionDate: DateTime
}

export default LandlordInterface
