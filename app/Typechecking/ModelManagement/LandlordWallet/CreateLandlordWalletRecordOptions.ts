import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import LandlordWalletInterface from 'App/Typechecking/ModelManagement/LandlordWallet/LandlordWalletInterface'

type CreateLandlordWalletPayloadOptions = Pick<
  LandlordWalletInterface,
  'landlordId' | 'walletAccountNumber' | 'walletBalance' | 'totalInflow' | 'totalOutflow'
>

type CreateLandlordWalletRecordOptions = CreateNewRecordGeneric<CreateLandlordWalletPayloadOptions>

export default CreateLandlordWalletRecordOptions
