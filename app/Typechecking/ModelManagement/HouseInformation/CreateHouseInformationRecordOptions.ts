import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import HouseInformationInterface from 'App/Typechecking/ModelManagement/HouseInformation/HouseInformationInterface'

type CreateHouseInformationPayloadOptions = Pick<
  HouseInformationInterface,
  'houseId' | 'area' | 'lgaId' | 'nearestLandmark' | 'latitude' | 'longitude' | 'stateId'
>

type CreateHouseInformationRecordOptions =
  CreateNewRecordGeneric<CreateHouseInformationPayloadOptions>

export default CreateHouseInformationRecordOptions
