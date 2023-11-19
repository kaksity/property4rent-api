import DbTransactionOptions from 'App/Typechecking/GeneralPurpose/DbTransactionOptions'

type DeleteRecordGeneric<RecordIdentifierOptions> = {
    identifierOptions: RecordIdentifierOptions
    
    dbTransactionOptions: DbTransactionOptions
}

export default DeleteRecordGeneric