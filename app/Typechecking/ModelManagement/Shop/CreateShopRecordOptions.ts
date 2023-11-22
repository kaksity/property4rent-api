import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import ShopInterface from 'App/Typechecking/ModelManagement/Shop/ShopInterface'

type CreateShopPayloadOptions = Pick<ShopInterface, 'id'>

type CreateShopRecordOptions = CreateNewRecordGeneric<CreateShopPayloadOptions>

export default CreateShopRecordOptions
