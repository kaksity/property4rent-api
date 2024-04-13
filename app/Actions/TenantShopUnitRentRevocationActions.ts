import TenantShopUnitRentRevocation from 'App/Models/TenantShopUnitRentRevocation'
import TenantShopUnitRentRevocationRecordIdentifierOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRentRevocation/TenantShopUnitRentRevocationRecordIdentifierOptions'
import CreateTenantShopUnitRentRevocationRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRentRevocation/CreateTenantShopUnitRentRevocationRecordOptions'
import DeleteTenantShopUnitRentRevocationRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRentRevocation/DeleteTenantShopUnitRentRevocationRecordOptions'
import ListTenantShopUnitRentRevocationRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRentRevocation/ListTenantShopUnitRentRevocationRecordOptions'
import UpdateTenantShopUnitRentRevocationRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRentRevocation/UpdateTenantShopUnitRentRevocationRecordOptions'
import GetTenantShopUnitRentRevocationDistinctRecordOptions from 'App/Typechecking/ModelManagement/TenantShopUnitRentRevocation/GetTenantShopUnitRentRevocationDistinctRecordOptions'

export default class TenantShopUnitRentRevocationActions {
  /**
   * @description Method to create a new TenantShopUnitRentRevocation
   * @author DP
   * @static
   * @param {CreateTenantShopUnitRentRevocationRecordOptions} createTenantShopUnitRentRevocationRecordOptions
   * @return {*}  {Promise<TenantShopUnitRentRevocation>}
   * @memberof TenantShopUnitRentRevocationActions
   */
  public static async createTenantShopUnitRentRevocationRecord(
    createTenantShopUnitRentRevocationRecordOptions: CreateTenantShopUnitRentRevocationRecordOptions
  ): Promise<TenantShopUnitRentRevocation> {
    const { createPayload, dbTransactionOptions } = createTenantShopUnitRentRevocationRecordOptions

    const tenantShopUnitRentRevocation = new TenantShopUnitRentRevocation()

    Object.assign(tenantShopUnitRentRevocation, createPayload)

    if (dbTransactionOptions.useTransaction) {
      tenantShopUnitRentRevocation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantShopUnitRentRevocation.save()

    return tenantShopUnitRentRevocation
  }

  /**
   * @description Method to get an TenantShopUnitRentRevocation by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<TenantShopUnitRentRevocation | null>)}
   * @memberof TenantShopUnitRentRevocationActions
   */
  public static async getTenantShopUnitRentRevocationById(
    id: number
  ): Promise<TenantShopUnitRentRevocation | null> {
    return TenantShopUnitRentRevocation.query()
      .preload('tenant')
      .preload('landlord')
      .preload('shopUnit')
      .where('id', id)
      .first()
  }

  /**
   * @description Method to get TenantShopUnitRentRevocation by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<TenantShopUnitRentRevocation | null>)}
   * @memberof TenantShopUnitRentRevocationActions
   */
  public static async getTenantShopUnitRentRevocationByIdentifier(
    identifier: string
  ): Promise<TenantShopUnitRentRevocation | null> {
    return TenantShopUnitRentRevocation.query()
      .preload('tenant')
      .preload('landlord')
      .preload('shopUnit')
      .where('identifier', identifier)
      .first()
  }

  /**
   * @description Method to get an TenantShopUnitRentRevocation record
   * @author DP
   * @static
   * @param {TenantShopUnitRentRevocationRecordIdentifierOptions} TenantShopUnitRentRevocationRecordIdentifierOptions
   * @return {*}  {(Promise<TenantShopUnitRentRevocation | null>)}
   * @memberof TenantShopUnitRentRevocationActions
   */
  public static async getTenantShopUnitRentRevocationRecord(
    TenantShopUnitRentRevocationRecordIdentifierOptions: TenantShopUnitRentRevocationRecordIdentifierOptions
  ): Promise<TenantShopUnitRentRevocation | null> {
    const { identifierType, identifier } = TenantShopUnitRentRevocationRecordIdentifierOptions

    const GetTenantShopUnitRentRevocationRecord: Record<string, Function> = {
      id: async () => await this.getTenantShopUnitRentRevocationById(Number(identifier)),
      identifier: async () =>
        await this.getTenantShopUnitRentRevocationByIdentifier(String(identifier)),
    }

    return GetTenantShopUnitRentRevocationRecord[identifierType]()
  }

  /**
   * @description Method to update an TenantShopUnitRentRevocation record
   * @author DP
   * @static
   * @param {UpdateTenantShopUnitRentRevocationRecordOptions} updateTenantShopUnitRentRevocationRecordOptions
   * @return {*}  {(Promise<TenantShopUnitRentRevocation | null>)}
   * @memberof TenantShopUnitRentRevocationActions
   */
  public static async updateTenantShopUnitRentRevocationRecord(
    updateTenantShopUnitRentRevocationRecordOptions: UpdateTenantShopUnitRentRevocationRecordOptions
  ): Promise<TenantShopUnitRentRevocation | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateTenantShopUnitRentRevocationRecordOptions

    const tenantShopUnitRentRevocation =
      await this.getTenantShopUnitRentRevocationRecord(identifierOptions)

    if (tenantShopUnitRentRevocation === null) {
      return null
    }

    Object.assign(tenantShopUnitRentRevocation, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      tenantShopUnitRentRevocation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantShopUnitRentRevocation.save()

    return tenantShopUnitRentRevocation
  }

  /**
   * @description Method to delete an TenantShopUnitRentRevocation record
   * @author DP
   * @static
   * @param {DeleteTenantShopUnitRentRevocationRecordOptions} deleteTenantShopUnitRentRevocationRecordOptions
   * @return {*}
   * @memberof TenantShopUnitRentRevocationActions
   */
  public static async deleteTenantShopUnitRentRevocationRecord(
    deleteTenantShopUnitRentRevocationRecordOptions: DeleteTenantShopUnitRentRevocationRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } =
      deleteTenantShopUnitRentRevocationRecordOptions

    const tenantShopUnitRentRevocation =
      await this.getTenantShopUnitRentRevocationRecord(identifierOptions)

    if (tenantShopUnitRentRevocation === null) return

    if (dbTransactionOptions.useTransaction) {
      tenantShopUnitRentRevocation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantShopUnitRentRevocation.softDelete()
  }

  /**
   * @description Method to list TenantShopUnitRentRevocations
   * @author DP
   * @static
   * @param {ListTenantShopUnitRentRevocationRecordOptions} listTenantShopUnitRentRevocationRecordOptions
   * @return {*}  {Promise<{ tenantShopUnitRentRevocationPayload: TenantShopUnitRentRevocation[]; paginationMeta?: any }>}
   * @memberof TenantShopUnitRentRevocationActions
   */
  public static async listTenantShopUnitRentRevocations(
    listTenantShopUnitRentRevocationRecordOptions: ListTenantShopUnitRentRevocationRecordOptions
  ): Promise<{
    tenantShopUnitRentRevocationPayload: TenantShopUnitRentRevocation[]
    paginationMeta?: any
  }> {
    const { paginationOptions } = listTenantShopUnitRentRevocationRecordOptions
    const tenantShopUnitRentRevocationQuery = TenantShopUnitRentRevocation.query()
      .preload('tenant')
      .preload('landlord')
      .preload('shopUnit')
      .orderBy('created_at', 'asc')

    if (paginationOptions) {
      const TenantShopUnitRentRevocations = await tenantShopUnitRentRevocationQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        tenantShopUnitRentRevocationPayload: TenantShopUnitRentRevocations.all(),
        paginationMeta: TenantShopUnitRentRevocations.getMeta(),
      }
    }

    const TenantShopUnitRentRevocations = await tenantShopUnitRentRevocationQuery
    return {
      tenantShopUnitRentRevocationPayload: TenantShopUnitRentRevocations,
    }
  }

  /**
   * @description Method to get distinct shop unit rent information
   * @author DP
   * @param {GetTenantShopUnitRentRevocationDistinctRecordOptions} getTenantShopUnitRentRevocationDistinctRecordOptions
   * @return {*}  {(Promise<TenantshopUnitRent | null>)}
   * @memberof TenantShopUnitRentRevocationActions
   */
  public static async getTenantShopUnitRentRevocationDistinct(
    getTenantShopUnitRentRevocationDistinctRecordOptions: GetTenantShopUnitRentRevocationDistinctRecordOptions
  ): Promise<TenantShopUnitRentRevocation | null> {
    const { shopUnitId, tenantId, landlordId } =
      getTenantShopUnitRentRevocationDistinctRecordOptions
    return await TenantShopUnitRentRevocation.query()
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
