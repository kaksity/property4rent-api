import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListTenantHouseUnitRentFilterPayloadOptions = {
  houseUnitId?: number

  tenantId?: number

  landlordId?: number

  rentStatus?: 'active' | 'inactive' | 'expired'
}

type ListTenantHouseUnitRentRecordOptions =
  ListRecordsGeneric<ListTenantHouseUnitRentFilterPayloadOptions>

export default ListTenantHouseUnitRentRecordOptions
