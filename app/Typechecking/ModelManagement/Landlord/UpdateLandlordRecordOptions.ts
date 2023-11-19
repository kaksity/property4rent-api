import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import LandlordInterface from 'App/Typechecking/ModelManagement/Landlord/LandlordInterface'
import LandlordRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Landlord/LandlordRecordIdentifierOptions'

type UpdateLandlordPayloadOptions = Partial<LandlordInterface>

type UpdateLandlordRecordOptions = UpdateRecordGeneric<
  UpdateLandlordPayloadOptions,
  LandlordRecordIdentifierOptions
>

export default UpdateLandlordRecordOptions
