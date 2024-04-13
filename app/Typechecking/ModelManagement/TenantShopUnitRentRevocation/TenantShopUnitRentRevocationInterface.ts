import { DateTime } from 'luxon'

interface TenantShopUnitRentRevocationInterface {
  id: number

  identifier: string

  landlordId: number

  tenantId: number

  shopUnitId: number

  reason: string

  status: 'pending' | 'approved' | 'rejected'

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default TenantShopUnitRentRevocationInterface
