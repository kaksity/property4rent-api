import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListTenantWalletFilterPayloadOptions = {
  hasActivatedAccount?: boolean
}

type ListTenantWalletRecordOptions = ListRecordsGeneric<ListTenantWalletFilterPayloadOptions>

export default ListTenantWalletRecordOptions
