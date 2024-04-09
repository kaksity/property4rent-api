import { DateTime } from 'luxon'

interface ShopInformationInterface {
  id: number

  identifier: string

  shopId: number

  stateId: number

  lgaId: number

  area: string

  nearestLandmark: string

  longitude: string

  latitude: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default ShopInformationInterface
