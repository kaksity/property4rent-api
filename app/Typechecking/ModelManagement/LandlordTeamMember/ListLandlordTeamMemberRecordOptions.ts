import ListRecordsGeneric from 'App/Typechecking/GeneralPurpose/ListRecordsGeneric'

type ListLandlordTeamMemberFilterPayloadOptions = {
  hasActivatedAccount?: boolean
  landlordId?: number
}

type ListLandlordTeamMemberRecordOptions =
  ListRecordsGeneric<ListLandlordTeamMemberFilterPayloadOptions>

export default ListLandlordTeamMemberRecordOptions
