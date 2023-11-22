import { DateTime } from 'luxon'

interface ShopInformationInterface {
  id: number

  identifier: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default ShopInformationInterface
