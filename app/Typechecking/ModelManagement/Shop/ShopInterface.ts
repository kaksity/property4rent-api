import { DateTime } from 'luxon'

interface ShopInterface {
  id: number

  identifier: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default ShopInterface
