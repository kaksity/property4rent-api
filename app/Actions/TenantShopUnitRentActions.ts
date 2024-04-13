import TenantShopUnitRent from 'App/Models/TenantShopUnitRent'
import TenantShopUnitRentRecordIdentifierOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRent/TenantShopUnitRentRecordIdentifierOptions'
import CreateTenantShopUnitRentRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRent/CreateTenantShopUnitRentRecordOptions'
import DeleteTenantShopUnitRentRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRent/DeleteTenantShopUnitRentRecordOptions'
import ListTenantShopUnitRentRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRent/ListTenantShopUnitRentRecordOptions'
import UpdateTenantShopUnitRentRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRent/UpdateTenantShopUnitRentRecordOptions'
import GetTenantShopUnitRentDistinctRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRent/GetTenantShopUnitRentDistinctRecordOptions'

export default class TenantShopUnitRentActions {
  /**
   * @description Method to create a new tenant shop rent
   * @author DP
   * @static
   * @param {CreateTenantShopUnitRentRecordOptions} createTenantShopUnitRentRecordOptions
   * @return {*}  {Promise<TenantShopUnitRent>}
   * @memberof TenantShopUnitRentActions
   */
  public static async createTenantShopUnitRentRecord(
    createTenantShopUnitRentRecordOptions: CreateTenantShopUnitRentRecordOptions
  ): Promise<TenantShopUnitRent> {
    const { createPayload, dbTransactionOptions } = createTenantShopUnitRentRecordOptions

    const tenantShopUnitRent = new TenantShopUnitRent()

    Object.assign(tenantShopUnitRent, createPayload)

    if (dbTransactionOptions.useTransaction) {
      tenantShopUnitRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantShopUnitRent.save()

    return tenantShopUnitRent
  }

  /**
   * @description Method to get an tenant shop rent by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<TenantShopUnitRent | null>)}
   * @memberof TenantShopUnitRentActions
   */
  public static async getTenantShopUnitRentById(id: number): Promise<TenantShopUnitRent | null> {
    return TenantShopUnitRent.query()
      .preload('landlord')
      .preload('tenant')
      .preload('shopUnit', (shopUnitQuery) => {
        shopUnitQuery.preload('shop')
      })
      .where('id', id)
      .first()
  }

  /**
   * @description Method to get tenant shop rent by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<TenantShopUnitRent | null>)}
   * @memberof TenantShopUnitRentActions
   */
  public static async getTenantShopUnitRentByIdentifier(
    identifier: string
  ): Promise<TenantShopUnitRent | null> {
    return TenantShopUnitRent.query()
      .preload('landlord')
      .preload('tenant')
      .preload('shopUnit', (shopUnitQuery) => {
        shopUnitQuery.preload('shop')
      })
      .where('identifier', identifier)
      .first()
  }

  /**
   * @description Method to get an tenant shop rent record
   * @author DP
   * @static
   * @param {TenantShopUnitRentRecordIdentifierOptions} TenantShopUnitRentRecordIdentifierOptions
   * @return {*}  {(Promise<TenantShopUnitRent | null>)}
   * @memberof TenantShopUnitRentActions
   */
  public static async getTenantShopUnitRentRecord(
    TenantShopUnitRentRecordIdentifierOptions: TenantShopUnitRentRecordIdentifierOptions
  ): Promise<TenantShopUnitRent | null> {
    const { identifierType, identifier } = TenantShopUnitRentRecordIdentifierOptions

    const GetTenantShopUnitRentRecord: Record<string, Function> = {
      id: async () => await this.getTenantShopUnitRentById(Number(identifier)),
      identifier: async () => await this.getTenantShopUnitRentByIdentifier(String(identifier)),
    }

    return GetTenantShopUnitRentRecord[identifierType]()
  }

  /**
   * @description Method to update an tenant shop rent record
   * @author DP
   * @static
   * @param {UpdateTenantShopUnitRentRecordOptions} updateTenantShopUnitRentRecordOptions
   * @return {*}  {(Promise<TenantShopUnitRent | null>)}
   * @memberof TenantShopUnitRentActions
   */
  public static async updateTenantShopUnitRentRecord(
    updateTenantShopUnitRentRecordOptions: UpdateTenantShopUnitRentRecordOptions
  ): Promise<TenantShopUnitRent | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateTenantShopUnitRentRecordOptions

    const tenantShopUnitRent = await this.getTenantShopUnitRentRecord(identifierOptions)

    if (tenantShopUnitRent === null) {
      return null
    }

    Object.assign(tenantShopUnitRent, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      tenantShopUnitRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantShopUnitRent.save()

    return tenantShopUnitRent
  }

  /**
   * @description Method to delete an tenant shop rent record
   * @author DP
   * @static
   * @param {DeleteTenantShopUnitRentRecordOptions} deleteTenantShopUnitRentRecordOptions
   * @return {*}
   * @memberof TenantShopUnitRentActions
   */
  public static async deleteTenantShopUnitRentRecord(
    deleteTenantShopUnitRentRecordOptions: DeleteTenantShopUnitRentRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteTenantShopUnitRentRecordOptions

    const tenantShopUnitRent = await this.getTenantShopUnitRentRecord(identifierOptions)

    if (tenantShopUnitRent === null) return

    if (dbTransactionOptions.useTransaction) {
      tenantShopUnitRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantShopUnitRent.softDelete()
  }

  /**
   * @description Method to list tenant shop rents
   * @author DP
   * @static
   * @param {ListTenantShopUnitRentRecordOptions} listTenantShopUnitRentRecordOptions
   * @return {*}  {Promise<{ tenantShopUnitRentPayload: TenantShopUnitRent[]; paginationMeta?: any }>}
   * @memberof TenantShopUnitRentActions
   */
  public static async listTenantShopUnitRents(
    listTenantShopUnitRentRecordOptions: ListTenantShopUnitRentRecordOptions
  ): Promise<{ tenantShopUnitRentPayload: TenantShopUnitRent[]; paginationMeta?: any }> {
    const { filterRecordOptions, paginationOptions } = listTenantShopUnitRentRecordOptions
    const tenantShopUnitRentQuery = TenantShopUnitRent.query()
      .preload('landlord')
      .preload('tenant')
      .preload('shopUnit', (shopUnitQuery) => {
        shopUnitQuery.preload('shop')
      })
      .orderBy('updated_at', 'desc')

    if (filterRecordOptions?.shopUnitId) {
      tenantShopUnitRentQuery.where('shop_unit_id', filterRecordOptions.shopUnitId)
    }

    if (filterRecordOptions?.tenantId) {
      tenantShopUnitRentQuery.where('tenant_id', filterRecordOptions.tenantId)
    }

    if (filterRecordOptions?.landlordId) {
      tenantShopUnitRentQuery.where('landlord_id', filterRecordOptions.landlordId)
    }

    if (filterRecordOptions?.rentStatus) {
      tenantShopUnitRentQuery.where('rent_status', filterRecordOptions.rentStatus)
    }

    if (paginationOptions) {
      const tenantShopUnitRents = await tenantShopUnitRentQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        tenantShopUnitRentPayload: tenantShopUnitRents.all(),
        paginationMeta: tenantShopUnitRents.getMeta(),
      }
    }

    const tenantShopUnitRents = await tenantShopUnitRentQuery
    return {
      tenantShopUnitRentPayload: tenantShopUnitRents,
    }
  }

  /**
   * @description Method to get distinct shop unit rent information
   * @author DP
   * @param {GetTenantShopUnitRentDistinctRecordOptions} getTenantShopUnitRentDistinctRecordOptions
   * @return {*}  {(Promise<TenantShopUnitRent | null>)}
   * @memberof TenantShopUnitRentActions
   */
  public static async getTenantShopUnitRentDistinct(
    getTenantShopUnitRentDistinctRecordOptions: GetTenantShopUnitRentDistinctRecordOptions
  ): Promise<TenantShopUnitRent | null> {
    const { shopUnitId, tenantId, landlordId } = getTenantShopUnitRentDistinctRecordOptions
    return await TenantShopUnitRent.query()
      .preload('tenant')
      .preload('shopUnit')
      .preload('landlord')
      .where('shop_unit_id', shopUnitId)
      .where('tenant_id', tenantId)
      .where('landlord_id', landlordId)
      .orderBy('updated_at', 'desc')
      .first()
  }
}
