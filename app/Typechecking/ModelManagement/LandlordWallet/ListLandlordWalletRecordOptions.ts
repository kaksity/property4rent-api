import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListLandlordWalletFilterPayloadOptions = {
  hasActivatedAccount?: boolean
}

type ListLandlordWalletRecordOptions = ListRecordsGeneric<ListLandlordWalletFilterPayloadOptions>

export default ListLandlordWalletRecordOptions
