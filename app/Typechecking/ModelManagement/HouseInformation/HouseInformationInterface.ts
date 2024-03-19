import { DateTime } from 'luxon'

interface HouseInformationInterface {
  id: number

  identifier: string

  houseId: number

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

export default HouseInformationInterface
