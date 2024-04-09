import ShopUnit from 'App/Models/ShopUnit'
import ShopUnitRecordIdentifierOptions from 'App/Typechecking/ModelManagement/ShopUnit/ShopUnitRecordIdentifierOptions'
import CreateShopUnitRecordOptions from 'App/Typechecking/ModelManagement/ShopUnit/CreateShopUnitRecordOptions'
import DeleteShopUnitRecordOptions from 'App/Typechecking/ModelManagement/ShopUnit/DeleteShopUnitRecordOptions'
import ListShopUnitRecordOptions from 'App/Typechecking/ModelManagement/ShopUnit/ListShopUnitRecordOptions'
import UpdateShopUnitRecordOptions from 'App/Typechecking/ModelManagement/ShopUnit/UpdateShopUnitRecordOptions'

export default class ShopUnitActions {
  /**
   * @description Method to create a Shop unit record
   * @author DP
   * @static
   * @param {CreateShopUnitRecordOptions} createShopUnitRecordOptions
   * @return {*}  {Promise<ShopUnit>}
   * @memberof ShopUnitActions
   */
  public static async createShopUnitRecord(
    createShopUnitRecordOptions: CreateShopUnitRecordOptions
  ): Promise<ShopUnit> {
    const { createPayload, dbTransactionOptions } = createShopUnitRecordOptions

    const shopUnit = new ShopUnit()

    Object.assign(shopUnit, createPayload)

    if (dbTransactionOptions.useTransaction) {
      shopUnit.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shopUnit.save()

    return shopUnit
  }

  /**
   * @description Method to get Shop unit by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<ShopUnit | null>)}
   * @memberof ShopUnitActions
   */
  public static async getShopUnitById(id: number): Promise<ShopUnit | null> {
    return ShopUnit.query().preload('shop').where('id', id).first()
  }

  /**
   * @description Method to get Shop unit by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<ShopUnit | null>)}
   * @memberof ShopUnitActions
   */
  public static async getShopUnitByIdentifier(identifier: string): Promise<ShopUnit | null> {
    return ShopUnit.query().preload('shop').where('identifier', identifier).first()
  }

  /**
   * @description Method to get Shop unit record
   * @author DP
   * @static
   * @param {ShopUnitRecordIdentifierOptions} ShopUnitRecordIdentifierOptions
   * @return {*}  {(Promise<ShopUnit | null>)}
   * @memberof ShopUnitActions
   */
  public static async getShopUnitRecord(
    ShopUnitRecordIdentifierOptions: ShopUnitRecordIdentifierOptions
  ): Promise<ShopUnit | null> {
    const { identifierType, identifier } = ShopUnitRecordIdentifierOptions

    const GetShopUnitRecord: Record<string, Function> = {
      id: async () => await this.getShopUnitById(Number(identifier)),
      identifier: async () => await this.getShopUnitByIdentifier(String(identifier)),
    }

    return GetShopUnitRecord[identifierType]()
  }

  /**
   * @description Method to update Shop Unit
   * @author DP
   * @static
   * @param {UpdateShopUnitRecordOptions} updateShopUnitRecordOptions
   * @return {*}  {(Promise<ShopUnit | null>)}
   * @memberof ShopUnitActions
   */
  public static async updateShopUnitRecord(
    updateShopUnitRecordOptions: UpdateShopUnitRecordOptions
  ): Promise<ShopUnit | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } = updateShopUnitRecordOptions

    const shopUnit = await this.getShopUnitRecord(identifierOptions)

    if (shopUnit === null) {
      return null
    }

    Object.assign(shopUnit, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      shopUnit.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shopUnit.save()

    return shopUnit
  }

  /**
   * @description Method to delete Shop Unit
   * @author DP
   * @static
   * @param {DeleteShopUnitRecordOptions} deleteShopUnitRecordOptions
   * @return {*}  {Promise<void>}
   * @memberof ShopUnitActions
   */
  public static async deleteShopUnitRecord(
    deleteShopUnitRecordOptions: DeleteShopUnitRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteShopUnitRecordOptions

    const shopUnit = await this.getShopUnitRecord(identifierOptions)

    if (shopUnit === null) return

    if (dbTransactionOptions.useTransaction) {
      shopUnit.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await shopUnit.softDelete()
  }

  /**
   * @description Method to list Shop Unit
   * @author DP
   * @static
   * @param {ListShopUnitRecordOptions} listShopUnitRecordOptions
   * @return {*}  {Promise<{ shopUnitPayload: ShopUnit[]; paginationMeta?: any }>}
   * @memberof ShopUnitActions
   */
  public static async listShopUnits(
    listShopUnitRecordOptions: ListShopUnitRecordOptions
  ): Promise<{ shopUnitPayload: ShopUnit[]; paginationMeta?: any }> {
    const { paginationOptions, filterRecordOptions } = listShopUnitRecordOptions
    const shopUnitQuery = ShopUnit.query().preload('shop').orderBy('created_at', 'asc')

    if (filterRecordOptions?.shopId) {
      shopUnitQuery.where('Shop_id', filterRecordOptions.shopId)
    }

    if (paginationOptions) {
      const shopUnit = await shopUnitQuery.paginate(paginationOptions.page, paginationOptions.limit)
      return {
        shopUnitPayload: shopUnit.all(),
        paginationMeta: shopUnit.getMeta(),
      }
    }

    const shopUnits = await shopUnitQuery

    return {
      shopUnitPayload: shopUnits,
    }
  }
}
