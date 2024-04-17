import { DateTime } from 'luxon'

interface LandlordTeamMemberInterface {
  id: number

  identifier: string

  landlordId: number

  firstName: string

  lastName: string

  phoneNumber: string

  hasActivatedAccount: boolean

  isAccountLocked: boolean

  isAccountVerified: boolean

  role: 'owner' | 'member'

  lastLoginDate: DateTime

  email: string

  password: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default LandlordTeamMemberInterface
