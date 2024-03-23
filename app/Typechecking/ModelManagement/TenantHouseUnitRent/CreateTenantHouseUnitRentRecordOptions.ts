import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import TenantHouseUnitRentInterface from 'App/Typechecking/ModelManagement/TenantHouseUnitRent/TenantHouseUnitRentInterface'

type CreateTenantHouseUnitRentPayloadOptions = Pick<
  TenantHouseUnitRentInterface,
  | 'houseUnitId'
  | 'endRentDate'
  | 'houseRentAmount'
  | 'paidRentAmount'
  | 'startRentDate'
  | 'tenantId'
  | 'rentStatus'
  | 'landlordId'
>

type CreateTenantHouseUnitRentRecordOptions =
  CreateNewRecordGeneric<CreateTenantHouseUnitRentPayloadOptions>

export default CreateTenantHouseUnitRentRecordOptions
