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

  baseRentAmount: number

  minimumRentAmount: number

  maximumRentAmount: number

  possibleSuitableTenants: string

  occupationStatus: 'occupied' | 'empty'

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default HouseUnitInterface
