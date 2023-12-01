import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import ShopInterface from 'App/Typechecking/ModelManagement/Shop/ShopInterface'

type CreateShopPayloadOptions = Pick<ShopInterface, 'landlordId' | 'description'>

type CreateShopRecordOptions = CreateNewRecordGeneric<CreateShopPayloadOptions>

export default CreateShopRecordOptions
