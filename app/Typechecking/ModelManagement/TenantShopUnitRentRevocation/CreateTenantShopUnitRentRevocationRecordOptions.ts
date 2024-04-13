import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import TenantShopUnitRentRevocationInterface from 'App/Typechecking/ModelManagement/TenantShopUnitRentRevocation/TenantShopUnitRentRevocationInterface'

type CreateTenantShopUnitRentRevocationPayloadOptions = Pick<
  TenantShopUnitRentRevocationInterface,
  'landlordId' | 'tenantId' | 'shopUnitId' | 'reason' | 'status'
>

type CreateTenantShopUnitRentRevocationRecordOptions =
  CreateNewRecordGeneric<CreateTenantShopUnitRentRevocationPayloadOptions>

export default CreateTenantShopUnitRentRevocationRecordOptions
