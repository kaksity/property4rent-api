import DbTransactionOptions from 'App/Typechecking/GeneralPurpose/DbTransactionOptions'

type UnlockLandlordTeamMembersAccountRecordOptions = {
  identifierOptions: {
    landlordId: number
  }
  dbTransactionOptions: DbTransactionOptions
}

export default UnlockLandlordTeamMembersAccountRecordOptions
