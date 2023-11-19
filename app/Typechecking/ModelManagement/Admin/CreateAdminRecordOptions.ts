import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import AdminInterface from 'App/Typechecking/ModelManagement/Admin/AdminInterface'

type CreateAdminPayloadOptions = Pick<
  AdminInterface,
  'email' | 'firstName' | 'lastName' | 'password' | 'phoneNumber'
>

type CreateAdminRecordOptions = CreateNewRecordGeneric<CreateAdminPayloadOptions>

export default CreateAdminRecordOptions
