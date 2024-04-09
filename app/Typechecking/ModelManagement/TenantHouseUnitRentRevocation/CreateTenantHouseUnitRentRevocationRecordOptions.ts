import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import TenantHouseUnitRentRevocationInterface from 'App/Typechecking/ModelManagement/TenantHouseUnitRentRevocation/TenantHouseUnitRentRevocationInterface'

type CreateTenantHouseUnitRentRevocationPayloadOptions = Pick<
  TenantHouseUnitRentRevocationInterface,
  'landlordId' | 'tenantId' | 'houseUnitId' | 'reason' | 'status'
>

type CreateTenantHouseUnitRentRevocationRecordOptions =
  CreateNewRecordGeneric<CreateTenantHouseUnitRentRevocationPayloadOptions>

export default CreateTenantHouseUnitRentRevocationRecordOptions
