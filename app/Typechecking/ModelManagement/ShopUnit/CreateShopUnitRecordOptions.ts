import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import ShopUnitInterface from 'App/Typechecking/ModelManagement/ShopUnit/ShopUnitInterface'

type CreateShopUnitPayloadOptions = Pick<
  ShopUnitInterface,
  | 'shopId'
  | 'numberOfRooms'
  | 'numberOfToilets'
  | 'length'
  | 'breadth'
  | 'baseRentAmount'
  | 'minimumRentAmount'
  | 'maximumRentAmount'
  | 'possibleUseCases'
  | 'occupationStatus'
>

type CreateShopUnitRecordOptions = CreateNewRecordGeneric<CreateShopUnitPayloadOptions>

export default CreateShopUnitRecordOptions
