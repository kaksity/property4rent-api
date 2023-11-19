import {
  BaseModel,
  ModelQueryBuilderContract,
  beforeCreate,
  beforeFetch,
  beforeFind,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { cuid } from '@ioc:Adonis/Core/Helpers'
export default class AbstractModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public identifier: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

  @beforeCreate()
  public static async generateIdentifier(model: AbstractModel) {
    model.identifier = cuid()
  }

  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }

  @beforeFind()
  public static softDeletesFind = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
    query.whereNull('deleted_at')
  }

  @beforeFetch()
  public static softDeletesFetch = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
    query.whereNull('deleted_at')
  }
}
