import DbTransactionOptions from 'App/Typechecking/GeneralPurpose/DbTransactionOptions'

type VerifyLandlordTeamMembersAccountRecordOptions = {
  identifierOptions: {
    landlordId: number
  }
  dbTransactionOptions: DbTransactionOptions
}

export default VerifyLandlordTeamMembersAccountRecordOptions
