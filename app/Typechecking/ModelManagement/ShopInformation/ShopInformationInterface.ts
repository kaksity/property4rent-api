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

  length: number

  breadth: number

  baseAmount: number

  minimumAmount: number

  maximumAmount: number

  possibleUseCases: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default ShopInformationInterface
