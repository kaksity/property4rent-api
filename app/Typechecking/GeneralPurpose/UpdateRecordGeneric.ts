import DbTransactionOptions from 'App/Typechecking/GeneralPurpose/DbTransactionOptions'

type UpdateRecordGeneric<RecordPayload, RecordIdentifierOptions> = {
    identifierOptions: RecordIdentifierOptions
    
    updatePayload: RecordPayload

    dbTransactionOptions: DbTransactionOptions
}

export default UpdateRecordGeneric