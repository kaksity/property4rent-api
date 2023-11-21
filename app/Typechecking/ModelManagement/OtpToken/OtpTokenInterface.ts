import { DateTime } from 'luxon'

interface OtpTokenInterface {
  id: number

  identifier: string

  authorId: number

  purpose: string

  token: string

  expiresAt: DateTime

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default OtpTokenInterface
