import Shop from 'App/Models/Shop'
import ShopRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Shop/ShopRecordIdentifierOptions'
import CreateShopRecordOptions from 'App/Typechecking/ModelManagement/Shop/CreateShopRecordOptions'
import DeleteShopRecordOptions from 'App/Typechecking/ModelManagement/Shop/DeleteShopRecordOptions'
import ListShopRecordOptions from 'App/Typechecking/ModelManagement/Shop/ListShopRecordOptions'
import UpdateShopRecordOptions from 'App/Typechecking/ModelManagement/Shop/UpdateShopRecordOptions'

export default class ShopActions {
  public static async createShopRecord(
    createShopRecordOptions: CreateShopRecordOptions
  ): Promise<Shop> {
    const { createPayload, dbTransactionOptions } = createShopRecordOptions

    const shop = new Shop()

    Object.assign(shop, createPayload)

    if (dbTransactionOptions.useTransaction) {
      shop.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shop.save()

    return shop
  }

  public static async getShopById(id: number): Promise<Shop | null> {
    return Shop.query().preload('landlord').preload('information').where('id', id).first()
  }

  public static async getShopByIdentifier(identifier: string): Promise<Shop | null> {
    return Shop.query()
      .preload('landlord')
      .preload('information')
      .where('identifier', identifier)
      .first()
  }

  public static async getShopByEmailAddress(emailAddress: string): Promise<Shop | null> {
    return Shop.query()
      .preload('landlord')
      .preload('information')
      .where('email', emailAddress)
      .first()
  }

  public static async getShopRecord(
    ShopRecordIdentifierOptions: ShopRecordIdentifierOptions
  ): Promise<Shop | null> {
    const { identifierType, identifier } = ShopRecordIdentifierOptions

    const GetShopRecord: Record<string, Function> = {
      id: async () => await this.getShopById(Number(identifier)),
      identifier: async () => await this.getShopByIdentifier(String(identifier)),
      email: async () => await this.getShopByEmailAddress(String(identifier)),
    }

    return GetShopRecord[identifierType]()
  }

  public static async updateShopRecord(
    updateShopRecordOptions: UpdateShopRecordOptions
  ): Promise<Shop | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } = updateShopRecordOptions

    const shop = await this.getShopRecord(identifierOptions)

    if (shop === null) {
      return null
    }

    Object.assign(shop, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      shop.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shop.save()

    return shop
  }

  public static async deleteShopRecord(deleteShopRecordOptions: DeleteShopRecordOptions) {
    const { identifierOptions, dbTransactionOptions } = deleteShopRecordOptions

    const shop = await this.getShopRecord(identifierOptions)

    if (shop === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      shop.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shop.softDelete()
  }

  public static async listShops(
    listShopRecordOptions: ListShopRecordOptions
  ): Promise<{ shopPayload: Shop[]; paginationMeta?: any }> {
    const { paginationOptions, filterRecordOptions } = listShopRecordOptions
    const shopQuery = Shop.query()
      .preload('landlord')
      .preload('information', (informationQuery) =>
        informationQuery.preload('state').preload('lga')
      )
      .orderBy('created_at', 'asc')

    if (
      filterRecordOptions?.canViewInPublic !== undefined &&
      filterRecordOptions?.canViewInPublic !== null
    ) {
      shopQuery.where('can_view_in_public', filterRecordOptions?.canViewInPublic)
    }

    if (filterRecordOptions?.landlordId) {
      shopQuery.where('landlord_id', filterRecordOptions.landlordId)
    }

    if (paginationOptions) {
      const shops = await shopQuery.paginate(paginationOptions.page, paginationOptions.limit)
      return {
        shopPayload: shops.all(),
        paginationMeta: shops.getMeta(),
      }
    }

    const shops = await shopQuery
    return {
      shopPayload: shops,
    }
  }
}
