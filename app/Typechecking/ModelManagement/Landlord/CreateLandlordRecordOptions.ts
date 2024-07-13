import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import LandlordInterface from 'App/Typechecking/ModelManagement/Landlord/LandlordInterface'

type CreateLandlordPayloadOptions = Pick<LandlordInterface, 'name' | 'mutatedName' | 'address'>

type CreateLandlordRecordOptions = CreateNewRecordGeneric<CreateLandlordPayloadOptions>

export default CreateLandlordRecordOptions
