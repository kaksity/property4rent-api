import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'
import ShopInterface from 'App/Typechecking/ModelManagement/Shop/ShopInterface'

type ListShopFilterPayloadOptions = Partial<ShopInterface>

type ListShopRecordOptions = ListRecordsGeneric<ListShopFilterPayloadOptions>

export default ListShopRecordOptions
