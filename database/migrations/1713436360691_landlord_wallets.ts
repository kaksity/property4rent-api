import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'landlord_wallets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier').index()
      table.integer('landlord_id').index()
      table.string('wallet_account_number').index()
      table.string('wallet_pin')
      table.integer('wallet_balance').defaultTo(0)
      table.integer('total_inflow').defaultTo(0)
      table.integer('total_outflow').defaultTo(0)
      table.string('provider_account_number').nullable()
      table.string('provider_account_name').nullable()
      table.string('provider_bank_name').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
