import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListLandlordTeamMemberFilterPayloadOptions = {
  hasActivatedAccount?: boolean
}

type ListLandlordTeamMemberRecordOptions =
  ListRecordsGeneric<ListLandlordTeamMemberFilterPayloadOptions>

export default ListLandlordTeamMemberRecordOptions
