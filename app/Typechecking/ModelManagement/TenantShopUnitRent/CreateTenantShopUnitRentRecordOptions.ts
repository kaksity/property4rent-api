import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import TenantShopUnitRentInterface from 'App/Typechecking/ModelManagement/TenantShopUnitRent/TenantShopUnitRentInterface'

type CreateTenantShopUnitRentPayloadOptions = Pick<
  TenantShopUnitRentInterface,
  | 'shopUnitId'
  | 'endRentDate'
  | 'shopRentAmount'
  | 'paidRentAmount'
  | 'startRentDate'
  | 'tenantId'
  | 'rentStatus'
  | 'landlordId'
>

type CreateTenantShopUnitRentRecordOptions =
  CreateNewRecordGeneric<CreateTenantShopUnitRentPayloadOptions>

export default CreateTenantShopUnitRentRecordOptions
