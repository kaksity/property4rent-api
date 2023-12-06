import House from 'App/Models/House'
import HouseRecordIdentifierOptions from 'App/Typechecking/ModelManagement/House/HouseRecordIdentifierOptions'
import CreateHouseRecordOptions from 'App/Typechecking/ModelManagement/House/CreateHouseRecordOptions'
import DeleteHouseRecordOptions from 'App/Typechecking/ModelManagement/House/DeleteHouseRecordOptions'
import ListHouseRecordOptions from 'App/Typechecking/ModelManagement/House/ListHouseRecordOptions'
import UpdateHouseRecordOptions from 'App/Typechecking/ModelManagement/House/UpdateHouseRecordOptions'

export default class HouseActions {
  public static async createHouseRecord(
    createHouseRecordOptions: CreateHouseRecordOptions
  ): Promise<House> {
    const { createPayload, dbTransactionOptions } = createHouseRecordOptions

    const house = new House()

    Object.assign(House, createPayload)

    if (dbTransactionOptions.useTransaction) {
      house.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await house.save()

    return house
  }

  public static async getHouseById(id: number): Promise<House | null> {
    return House.query()
      .preload('landlord')
      .preload('information', (informationQuery) =>
        informationQuery.preload('lga').preload('state')
      )
      .where('id', id)
      .first()
  }

  public static async getHouseByIdentifier(identifier: string): Promise<House | null> {
    return House.query()
      .preload('landlord')
      .preload('information', (informationQuery) =>
        informationQuery.preload('lga').preload('state')
      )
      .where('identifier', identifier)
      .first()
  }

  public static async getHouseRecord(
    HouseRecordIdentifierOptions: HouseRecordIdentifierOptions
  ): Promise<House | null> {
    const { identifierType, identifier } = HouseRecordIdentifierOptions

    const GetHouseRecord: Record<string, Function> = {
      id: async () => await this.getHouseById(Number(identifier)),
      identifier: async () => await this.getHouseByIdentifier(String(identifier)),
    }

    return GetHouseRecord[identifierType]()
  }

  public static async updateHouseRecord(
    updateHouseRecordOptions: UpdateHouseRecordOptions
  ): Promise<House | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } = updateHouseRecordOptions

    const house = await this.getHouseRecord(identifierOptions)

    if (house === null) {
      return null
    }

    Object.assign(house, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      house.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await house.save()

    return house
  }

  public static async deleteHouseRecord(deleteHouseRecordOptions: DeleteHouseRecordOptions) {
    const { identifierOptions, dbTransactionOptions } = deleteHouseRecordOptions

    const house = await this.getHouseRecord(identifierOptions)

    if (house === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      house.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await house.softDelete()
  }

  public static async listHouses(
    listHouseRecordOptions: ListHouseRecordOptions
  ): Promise<{ housePayload: House[]; paginationMeta?: any }> {
    const { paginationOptions, filterRecordOptions } = listHouseRecordOptions
    const houseQuery = House.query()
      .preload('landlord')
      .preload('information', (informationQuery) =>
        informationQuery.preload('state').preload('lga')
      )
      .orderBy('created_at', 'asc')

    if (
      filterRecordOptions?.canViewInPublic !== undefined &&
      filterRecordOptions?.canViewInPublic !== null
    ) {
      houseQuery.where('can_view_in_public', filterRecordOptions?.canViewInPublic)
    }

    if (filterRecordOptions?.landlordId) {
      houseQuery.where('landlord_id', filterRecordOptions.landlordId)
    }

    if (paginationOptions) {
      const houses = await houseQuery.paginate(paginationOptions.page, paginationOptions.limit)

      return {
        housePayload: houses.all(),
        paginationMeta: houses.getMeta(),
      }
    }

    const houses = await houseQuery
    return {
      housePayload: houses,
    }
  }
}
