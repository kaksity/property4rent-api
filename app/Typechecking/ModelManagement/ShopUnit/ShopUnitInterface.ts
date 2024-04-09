import { DateTime } from 'luxon'

interface ShopUnitInterface {
  id: number

  identifier: string

  shopId: number

  numberOfRooms: number

  numberOfToilets: number

  length: number

  breadth: number

  baseRentAmount: number

  minimumRentAmount: number

  maximumRentAmount: number

  possibleUseCases: string

  occupationStatus: 'occupied' | 'empty'

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default ShopUnitInterface
