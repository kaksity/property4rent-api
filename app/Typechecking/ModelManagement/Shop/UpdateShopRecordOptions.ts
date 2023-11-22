import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import ShopInterface from 'App/Typechecking/ModelManagement/Shop/ShopInterface'
import ShopRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Shop/ShopRecordIdentifierOptions'

type UpdateShopPayloadOptions = Partial<ShopInterface>

type UpdateShopRecordOptions = UpdateRecordGeneric<
  UpdateShopPayloadOptions,
  ShopRecordIdentifierOptions
>

export default UpdateShopRecordOptions
