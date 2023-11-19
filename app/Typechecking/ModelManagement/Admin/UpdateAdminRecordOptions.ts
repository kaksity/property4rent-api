import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import AdminInterface from 'App/Typechecking/ModelManagement/Admin/AdminInterface'
import AdminRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Admin/AdminRecordIdentifierOptions'

type UpdateAdminPayloadOptions = Partial<AdminInterface>

type UpdateAdminRecordOptions = UpdateRecordGeneric<
  UpdateAdminPayloadOptions,
  AdminRecordIdentifierOptions
>

export default UpdateAdminRecordOptions
