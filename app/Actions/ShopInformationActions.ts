import ShopInformation from 'App/Models/ShopInformation'
import ShopInformationRecordIdentifierOptions from 'App/Typechecking/ModelManagement/ShopInformation/ShopInformationRecordIdentifierOptions'
import CreateShopInformationRecordOptions from 'App/Typechecking/ModelManagement/ShopInformation/CreateShopInformationRecordOptions'
import DeleteShopInformationRecordOptions from 'App/Typechecking/ModelManagement/ShopInformation/DeleteShopInformationRecordOptions'
import ListShopInformationRecordOptions from 'App/Typechecking/ModelManagement/ShopInformation/ListShopInformationRecordOptions'
import UpdateShopInformationRecordOptions from 'App/Typechecking/ModelManagement/ShopInformation/UpdateShopInformationRecordOptions'

export default class ShopInformationActions {
  public static async createShopInformationRecord(
    createShopInformationRecordOptions: CreateShopInformationRecordOptions
  ): Promise<ShopInformation> {
    const { createPayload, dbTransactionOptions } = createShopInformationRecordOptions

    const shopInformation = new ShopInformation()

    Object.assign(shopInformation, createPayload)

    if (dbTransactionOptions.useTransaction) {
      shopInformation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shopInformation.save()

    return shopInformation
  }

  public static async getShopInformationById(id: number): Promise<ShopInformation | null> {
    return ShopInformation.query().where('id', id).first()
  }

  public static async getShopInformationByIdentifier(
    identifier: string
  ): Promise<ShopInformation | null> {
    return ShopInformation.query().where('identifier', identifier).first()
  }

  public static async getShopInformationByEmailAddress(
    emailAddress: string
  ): Promise<ShopInformation | null> {
    return ShopInformation.query().where('email', emailAddress).first()
  }

  public static async getShopInformationRecord(
    ShopInformationRecordIdentifierOptions: ShopInformationRecordIdentifierOptions
  ): Promise<ShopInformation | null> {
    const { identifierType, identifier } = ShopInformationRecordIdentifierOptions

    const GetShopInformationRecord: Record<string, Function> = {
      id: async () => await this.getShopInformationById(Number(identifier)),
      identifier: async () => await this.getShopInformationByIdentifier(String(identifier)),
      email: async () => await this.getShopInformationByEmailAddress(String(identifier)),
    }

    return GetShopInformationRecord[identifierType]()
  }

  public static async updateShopInformationRecord(
    updateShopInformationRecordOptions: UpdateShopInformationRecordOptions
  ): Promise<ShopInformation | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateShopInformationRecordOptions

    const shopInformation = await this.getShopInformationRecord(identifierOptions)

    if (shopInformation === null) {
      return null
    }

    Object.assign(shopInformation, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      shopInformation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shopInformation.save()

    return shopInformation
  }

  public static async deleteShopInformationRecord(
    deleteShopInformationRecordOptions: DeleteShopInformationRecordOptions
  ) {
    const { identifierOptions, dbTransactionOptions } = deleteShopInformationRecordOptions

    const shopInformation = await this.getShopInformationRecord(identifierOptions)

    if (shopInformation === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      shopInformation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shopInformation.softDelete()
  }

  public static async listShopInformation(
    listShopInformationRecordOptions: ListShopInformationRecordOptions
  ): Promise<{ shopInformationPayload: ShopInformation[]; paginationMeta?: any }> {
    const { paginationOptions } = listShopInformationRecordOptions
    const shopInformationQuery = ShopInformation.query().orderBy('created_at', 'asc')

    if (paginationOptions) {
      const shopInformation = await shopInformationQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        shopInformationPayload: shopInformation.all(),
        paginationMeta: shopInformation.getMeta(),
      }
    }

    const shopInformation = await shopInformationQuery
    return {
      shopInformationPayload: shopInformation,
    }
  }
}
