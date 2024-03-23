import { DateTime } from 'luxon'

interface TenantHouseRentInterface {
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

export default TenantHouseRentInterface
