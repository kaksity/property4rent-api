import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'shop_units'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier').index()
      table.integer('shop_id').index()
      table.integer('number_of_rooms').defaultTo(0)
      table.integer('number_of_toilets').defaultTo(0)
      table.integer('length').defaultTo(0)
      table.integer('breadth').defaultTo(0)
      table.bigInteger('base_rent_amount').defaultTo(0)
      table.bigInteger('minimum_rent_amount').defaultTo(0)
      table.bigInteger('maximum_rent_amount').defaultTo(0)
      table.text('possible_use_cases').nullable()
      table.enum('occupation_status', ['occupied', 'empty']).defaultTo('empty')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
