import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import HouseInterface from 'App/Typechecking/ModelManagement/House/HouseInterface'

type CreateHousePayloadOptions = Pick<HouseInterface, 'landlordId' | 'description'>

type CreateHouseRecordOptions = CreateNewRecordGeneric<CreateHousePayloadOptions>

export default CreateHouseRecordOptions
