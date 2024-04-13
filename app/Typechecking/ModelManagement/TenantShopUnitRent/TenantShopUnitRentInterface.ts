import { DateTime } from 'luxon'

interface TenantShopUnitRentInterface {
  id: number

  identifier: string

  landlordId: number

  tenantId: number

  shopUnitId: number

  shopRentAmount: number

  paidRentAmount: number

  startRentDate: DateTime

  endRentDate: DateTime

  rentStatus: 'active' | 'inactive' | 'expired'

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default TenantShopUnitRentInterface
