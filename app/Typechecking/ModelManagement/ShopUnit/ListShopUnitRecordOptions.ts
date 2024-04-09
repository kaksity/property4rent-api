import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListShopUnitFilterPayloadOptions = {
  shopId?: number
}

type ListShopUnitRecordOptions = ListRecordsGeneric<ListShopUnitFilterPayloadOptions>

export default ListShopUnitRecordOptions
