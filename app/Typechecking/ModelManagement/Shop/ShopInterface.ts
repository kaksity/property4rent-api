import { DateTime } from 'luxon'

interface ShopInterface {
  id: number

  identifier: string

  landlordId: number

  description: string

  canViewInPublic: boolean
  
  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default ShopInterface
