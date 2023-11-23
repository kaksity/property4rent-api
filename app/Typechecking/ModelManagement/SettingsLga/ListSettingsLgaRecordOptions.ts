import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListSettingsLgaFilterPayloadOptions = {
  stateId?: number
}

type ListSettingsLgaRecordOptions = ListRecordsGeneric<ListSettingsLgaFilterPayloadOptions>

export default ListSettingsLgaRecordOptions
