import { DateTime } from 'luxon'

interface TenantHouseUnitRentInterface {
  id: number

  identifier: string

  landlordId: number

  tenantId: number

  houseUnitId: number

  houseRentAmount: number

  paidRentAmount: number

  startRentDate: DateTime

  endRentDate: DateTime

  rentStatus: 'active' | 'inactive' | 'expired'

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default TenantHouseUnitRentInterface
