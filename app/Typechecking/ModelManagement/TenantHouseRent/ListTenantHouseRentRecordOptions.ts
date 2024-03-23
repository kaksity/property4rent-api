import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListTenantHouseRentFilterPayloadOptions = {
  houseUnitId?: number
  tenantId?: number
}

type ListTenantHouseRentRecordOptions = ListRecordsGeneric<ListTenantHouseRentFilterPayloadOptions>

export default ListTenantHouseRentRecordOptions
