import DbTransactionOptions from 'App/Typechecking/GeneralPurpose/DbTransactionOptions'

type CreateNewRecordGeneric<RecordPayload> = {
  createPayload: RecordPayload

  dbTransactionOptions: DbTransactionOptions
}

export default CreateNewRecordGeneric
