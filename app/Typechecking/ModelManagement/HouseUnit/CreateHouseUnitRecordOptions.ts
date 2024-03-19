import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import HouseUnitInterface from 'App/Typechecking/ModelManagement/HouseUnit/HouseUnitInterface'

type CreateHouseUnitPayloadOptions = Pick<
  HouseUnitInterface,
  | 'houseId'
  | 'houseUnitType'
  | 'numberOfBathrooms'
  | 'numberOfKitchens'
  | 'numberOfRooms'
  | 'baseAmount'
  | 'breadth'
  | 'length'
  | 'maximumAmount'
  | 'minimumAmount'
  | 'possibleSuitableTenants'
>

type CreateHouseUnitRecordOptions = CreateNewRecordGeneric<CreateHouseUnitPayloadOptions>

export default CreateHouseUnitRecordOptions
