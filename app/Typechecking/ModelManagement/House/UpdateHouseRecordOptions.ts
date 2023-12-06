import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import HouseInterface from 'App/Typechecking/ModelManagement/House/HouseInterface'
import HouseRecordIdentifierOptions from 'App/Typechecking/ModelManagement/House/HouseRecordIdentifierOptions'

type UpdateHousePayloadOptions = Partial<HouseInterface>

type UpdateHouseRecordOptions = UpdateRecordGeneric<
  UpdateHousePayloadOptions,
  HouseRecordIdentifierOptions
>

export default UpdateHouseRecordOptions
