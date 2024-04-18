import DbTransactionOptions from 'App/Typechecking/GeneralPurpose/DbTransactionOptions'

type LockLandlordTeamMembersAccountRecordOptions = {
  identifierOptions: {
    landlordId: number
  }
  dbTransactionOptions: DbTransactionOptions
}

export default LockLandlordTeamMembersAccountRecordOptions
