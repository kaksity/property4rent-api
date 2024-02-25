import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import HouseUnitInterface from 'App/Typechecking/ModelManagement/HouseUnit/HouseUnitInterface'

type CreateHouseUnitPayloadOptions = Pick<
  HouseUnitInterface,
  'houseId' | 'houseUnitType' | 'numberOfBathrooms' | 'numberOfKitchens' | 'numberOfRooms'
>

type CreateHouseUnitRecordOptions = CreateNewRecordGeneric<CreateHouseUnitPayloadOptions>

export default CreateHouseUnitRecordOptions
