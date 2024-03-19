import { DateTime } from 'luxon'

interface HouseUnitInterface {
  id: number

  identifier: string

  houseId: number

  houseUnitType: 'Flat' | 'Apartment'

  numberOfRooms: number

  numberOfBathrooms: number

  numberOfKitchens: number

  length: number

  breadth: number

  baseAmount: number

  minimumAmount: number

  maximumAmount: number

  possibleSuitableTenants: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default HouseUnitInterface
