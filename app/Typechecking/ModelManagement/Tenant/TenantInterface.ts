import { DateTime } from 'luxon'

interface TenantInterface {
  id: number

  identifier: string

  createdByLandlordId: number | null

  firstName: string

  lastName: string

  phoneNumber: string

  hasActivatedAccount: boolean

  isAccountLocked: boolean

  isAccountVerified: boolean

  lastLoginDate: DateTime

  email: string

  password: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default TenantInterface
