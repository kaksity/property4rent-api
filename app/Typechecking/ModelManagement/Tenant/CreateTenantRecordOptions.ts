import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import TenantInterface from 'App/Typechecking/ModelManagement/Tenant/TenantInterface'

type CreateTenantPayloadOptions = Pick<
  TenantInterface,
  'email' | 'firstName' | 'lastName' | 'password' | 'phoneNumber' | 'createdByLandlordId'
>

type CreateTenantRecordOptions = CreateNewRecordGeneric<CreateTenantPayloadOptions>

export default CreateTenantRecordOptions
