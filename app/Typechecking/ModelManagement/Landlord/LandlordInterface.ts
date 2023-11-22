import { DateTime } from 'luxon'

interface LandlordInterface {
  id: number

  identifier: string

  firstName: string

  lastName: string

  phoneNumber: string

  hasActivatedAccount: boolean

  email: string

  password: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default LandlordInterface
