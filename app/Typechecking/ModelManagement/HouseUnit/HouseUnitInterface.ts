import { DateTime } from 'luxon'

interface HouseUnitInterface {
  id: number

  identifier: string

  houseId: number

  houseUnitType: 'Flat' | 'Apartment'

  numberOfRooms: number

  numberOfBathrooms: number

  numberOfKitchens: number

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default HouseUnitInterface
