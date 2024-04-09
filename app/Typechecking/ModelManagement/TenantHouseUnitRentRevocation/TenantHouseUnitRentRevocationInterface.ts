import { DateTime } from 'luxon'

interface TenantHouseUnitRentRevocationInterface {
  id: number

  identifier: string

  landlordId: number

  tenantId: number

  houseUnitId: number

  reason: string

  status: 'pending' | 'approved' | 'rejected'

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}

export default TenantHouseUnitRentRevocationInterface
