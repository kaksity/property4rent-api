import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import TenantHouseRentInterface from 'App/Typechecking/ModelManagement/TenantHouseRent/TenantHouseRentInterface'

type CreateTenantHouseRentPayloadOptions = Pick<
  TenantHouseRentInterface,
  | 'houseUnitId'
  | 'endRentDate'
  | 'houseRentAmount'
  | 'paidRentAmount'
  | 'startRentDate'
  | 'tenantId'
  | 'rentStatus'
  | 'landlordId'
>

type CreateTenantHouseRentRecordOptions =
  CreateNewRecordGeneric<CreateTenantHouseRentPayloadOptions>

export default CreateTenantHouseRentRecordOptions
