import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import ShopUnitInterface from 'App/Typechecking/ModelManagement/ShopUnit/ShopUnitInterface'
import ShopUnitRecordIdentifierOptions from 'App/Typechecking/ModelManagement/ShopUnit/ShopUnitRecordIdentifierOptions'

type UpdateShopUnitPayloadOptions = Partial<ShopUnitInterface>

type UpdateShopUnitRecordOptions = UpdateRecordGeneric<
  UpdateShopUnitPayloadOptions,
  ShopUnitRecordIdentifierOptions
>

export default UpdateShopUnitRecordOptions
