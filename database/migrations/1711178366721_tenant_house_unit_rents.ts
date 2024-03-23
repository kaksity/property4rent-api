import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tenant_house_unit_rents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier').index()
      table.integer('landlord_id').index()
      table.integer('tenant_id').index()
      table.integer('house_unit_id').index()
      table.bigInteger('house_rent_amount').defaultTo(0)
      table.bigInteger('paid_rent_amount').defaultTo(0)
      table.date('start_rent_date')
      table.date('end_rent_date')
      table.enum('rent_status', ['active', 'inactive', 'expired']).defaultTo('active')
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
