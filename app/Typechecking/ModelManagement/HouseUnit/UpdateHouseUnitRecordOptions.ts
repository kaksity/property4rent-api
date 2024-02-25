import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import HouseUnitInterface from 'App/Typechecking/ModelManagement/HouseUnit/HouseUnitInterface'
import HouseUnitRecordIdentifierOptions from 'App/Typechecking/ModelManagement/HouseUnit/HouseUnitRecordIdentifierOptions'

type UpdateHouseUnitPayloadOptions = Partial<HouseUnitInterface>

type UpdateHouseUnitRecordOptions = UpdateRecordGeneric<
  UpdateHouseUnitPayloadOptions,
  HouseUnitRecordIdentifierOptions
>

export default UpdateHouseUnitRecordOptions
