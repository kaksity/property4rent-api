import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListTenantHouseRentFilterPayloadOptions = {
  houseUnitId?: number

  tenantId?: number

  landlordId?: number

  rentStatus?: 'active' | 'inactive' | 'expired'
}

type ListTenantHouseRentRecordOptions = ListRecordsGeneric<ListTenantHouseRentFilterPayloadOptions>

export default ListTenantHouseRentRecordOptions
