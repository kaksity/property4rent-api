import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import TenantInterface from 'App/Typechecking/ModelManagement/Tenant/TenantInterface'
import TenantRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Tenant/TenantRecordIdentifierOptions'

type UpdateTenantPayloadOptions = Partial<TenantInterface>

type UpdateTenantRecordOptions = UpdateRecordGeneric<
  UpdateTenantPayloadOptions,
  TenantRecordIdentifierOptions
>

export default UpdateTenantRecordOptions
