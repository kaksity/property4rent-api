import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import LandlordInterface from 'App/Typechecking/ModelManagement/Landlord/LandlordInterface'

type CreateLandlordPayloadOptions = Pick<
  LandlordInterface,
  'email' | 'firstName' | 'lastName' | 'password' | 'phoneNumber'
>

type CreateLandlordRecordOptions = CreateNewRecordGeneric<CreateLandlordPayloadOptions>

export default CreateLandlordRecordOptions
