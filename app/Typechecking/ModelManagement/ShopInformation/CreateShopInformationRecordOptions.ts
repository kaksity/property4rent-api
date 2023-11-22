import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import ShopInformationInterface from 'App/Typechecking/ModelManagement/ShopInformation/ShopInformationInterface'

type CreateShopInformationPayloadOptions = Pick<ShopInformationInterface, 'id'>

type CreateShopInformationRecordOptions =
  CreateNewRecordGeneric<CreateShopInformationPayloadOptions>

export default CreateShopInformationRecordOptions
