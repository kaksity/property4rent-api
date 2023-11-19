import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'

type DbTransactionOptions = {
    useTransaction: true,
    dbTransaction: TransactionClientContract
} | {
    useTransaction: false
}

export default DbTransactionOptions