import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'
import HouseInterface from 'App/Typechecking/ModelManagement/House/HouseInterface'

type ListHouseFilterPayloadOptions = Partial<HouseInterface>

type ListHouseRecordOptions = ListRecordsGeneric<ListHouseFilterPayloadOptions>

export default ListHouseRecordOptions
