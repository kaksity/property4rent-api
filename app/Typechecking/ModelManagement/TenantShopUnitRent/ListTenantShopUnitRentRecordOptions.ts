import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListTenantShopUnitRentFilterPayloadOptions = {
  shopUnitId?: number

  tenantId?: number

  landlordId?: number

  rentStatus?: 'active' | 'inactive' | 'expired'
}

type ListTenantShopUnitRentRecordOptions =
  ListRecordsGeneric<ListTenantShopUnitRentFilterPayloadOptions>

export default ListTenantShopUnitRentRecordOptions
