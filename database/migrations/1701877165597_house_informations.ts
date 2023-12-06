import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'house_informations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier').index()
      table.integer('house_id').index()
      table.integer('state_id').nullable().index()
      table.integer('lga_id').nullable().index()
      table.string('area').nullable()
      table.string('nearest_landmark').nullable()
      table.string('longitude').nullable()
      table.string('latitude').nullable()
      table.integer('length').defaultTo(0)
      table.integer('breadth').defaultTo(0)
      table.bigInteger('base_amount').defaultTo(0)
      table.bigInteger('minimum_amount').defaultTo(0)
      table.bigInteger('maximum_amount').defaultTo(0)
      table.text('possible_use_cases').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
