import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('identifier').index()
      table.integer('created_by_landlord_id').nullable().index()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('phone_number', 20).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.boolean('has_activated_account').defaultTo(false)
      table.boolean('is_account_locked').defaultTo(false)
      table.boolean('is_account_verified').defaultTo(false)
      table.timestamp('last_login_date', { useTz: true }).nullable()
      table.string('remember_me_token').nullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
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
