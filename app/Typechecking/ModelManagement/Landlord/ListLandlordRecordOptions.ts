import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListLandlordFilterPayloadOptions = {
  hasActivatedAccount?: boolean
}

type ListLandlordRecordOptions = ListRecordsGeneric<ListLandlordFilterPayloadOptions>

export default ListLandlordRecordOptions
