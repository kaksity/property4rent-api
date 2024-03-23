import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'house_units'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier').index()
      table.integer('house_id').index()
      table.enum('house_unit_type', ['Flat', 'Apartment'])
      table.integer('number_of_rooms').defaultTo(0)
      table.integer('number_of_bathrooms').defaultTo(0)
      table.integer('number_of_kitchens').defaultTo(0)
      table.bigInteger('base_rent_amount').defaultTo(0)
      table.bigInteger('minimum_rent_amount').defaultTo(0)
      table.bigInteger('maximum_rent_amount').defaultTo(0)
      table.integer('length').defaultTo(0)
      table.integer('breadth').defaultTo(0)
      table.text('possible_suitable_tenants').nullable()
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
