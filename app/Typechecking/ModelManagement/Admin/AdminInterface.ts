import { DateTime } from 'luxon'

interface AdminInterface {
  id: number

  identifier: string

  firstName: string

  lastName: string

  phoneNumber: string

  email: string

  password: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default AdminInterface
