import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListHouseUnitFilterPayloadOptions = {
  houseId?: number
}

type ListHouseUnitRecordOptions = ListRecordsGeneric<ListHouseUnitFilterPayloadOptions>

export default ListHouseUnitRecordOptions
