import TenantHouseUnitRentRevocation from 'App/Models/TenantHouseUnitRentRevocation'
import TenantHouseUnitRentRevocationRecordIdentifierOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRentRevocation/TenantHouseUnitRentRevocationRecordIdentifierOptions'
import CreateTenantHouseUnitRentRevocationRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRentRevocation/CreateTenantHouseUnitRentRevocationRecordOptions'
import DeleteTenantHouseUnitRentRevocationRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRentRevocation/DeleteTenantHouseUnitRentRevocationRecordOptions'
import ListTenantHouseUnitRentRevocationRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRentRevocation/ListTenantHouseUnitRentRevocationRecordOptions'
import UpdateTenantHouseUnitRentRevocationRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRentRevocation/UpdateTenantHouseUnitRentRevocationRecordOptions'

export default class TenantHouseUnitRentRevocationActions {
  /**
   * @description Method to create a new TenantHouseUnitRentRevocation
   * @author DP
   * @static
   * @param {CreateTenantHouseUnitRentRevocationRecordOptions} createTenantHouseUnitRentRevocationRecordOptions
   * @return {*}  {Promise<TenantHouseUnitRentRevocation>}
   * @memberof TenantHouseUnitRentRevocationActions
   */
  public static async createTenantHouseUnitRentRevocationRecord(
    createTenantHouseUnitRentRevocationRecordOptions: CreateTenantHouseUnitRentRevocationRecordOptions
  ): Promise<TenantHouseUnitRentRevocation> {
    const { createPayload, dbTransactionOptions } = createTenantHouseUnitRentRevocationRecordOptions

    const tenantHouseUnitRentRevocation = new TenantHouseUnitRentRevocation()

    Object.assign(tenantHouseUnitRentRevocation, createPayload)

    if (dbTransactionOptions.useTransaction) {
      tenantHouseUnitRentRevocation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseUnitRentRevocation.save()

    return tenantHouseUnitRentRevocation
  }

  /**
   * @description Method to get an TenantHouseUnitRentRevocation by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<TenantHouseUnitRentRevocation | null>)}
   * @memberof TenantHouseUnitRentRevocationActions
   */
  public static async getTenantHouseUnitRentRevocationById(
    id: number
  ): Promise<TenantHouseUnitRentRevocation | null> {
    return TenantHouseUnitRentRevocation.query()
      .preload('tenant')
      .preload('landlord')
      .preload('houseUnit')
      .where('id', id)
      .first()
  }

  /**
   * @description Method to get TenantHouseUnitRentRevocation by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<TenantHouseUnitRentRevocation | null>)}
   * @memberof TenantHouseUnitRentRevocationActions
   */
  public static async getTenantHouseUnitRentRevocationByIdentifier(
    identifier: string
  ): Promise<TenantHouseUnitRentRevocation | null> {
    return TenantHouseUnitRentRevocation.query()
      .preload('tenant')
      .preload('landlord')
      .preload('houseUnit')
      .where('identifier', identifier)
      .first()
  }

  /**
   * @description Method to get an TenantHouseUnitRentRevocation record
   * @author DP
   * @static
   * @param {TenantHouseUnitRentRevocationRecordIdentifierOptions} TenantHouseUnitRentRevocationRecordIdentifierOptions
   * @return {*}  {(Promise<TenantHouseUnitRentRevocation | null>)}
   * @memberof TenantHouseUnitRentRevocationActions
   */
  public static async getTenantHouseUnitRentRevocationRecord(
    TenantHouseUnitRentRevocationRecordIdentifierOptions: TenantHouseUnitRentRevocationRecordIdentifierOptions
  ): Promise<TenantHouseUnitRentRevocation | null> {
    const { identifierType, identifier } = TenantHouseUnitRentRevocationRecordIdentifierOptions

    const GetTenantHouseUnitRentRevocationRecord: Record<string, Function> = {
      id: async () => await this.getTenantHouseUnitRentRevocationById(Number(identifier)),
      identifier: async () =>
        await this.getTenantHouseUnitRentRevocationByIdentifier(String(identifier)),
    }

    return GetTenantHouseUnitRentRevocationRecord[identifierType]()
  }

  /**
   * @description Method to update an TenantHouseUnitRentRevocation record
   * @author DP
   * @static
   * @param {UpdateTenantHouseUnitRentRevocationRecordOptions} updateTenantHouseUnitRentRevocationRecordOptions
   * @return {*}  {(Promise<TenantHouseUnitRentRevocation | null>)}
   * @memberof TenantHouseUnitRentRevocationActions
   */
  public static async updateTenantHouseUnitRentRevocationRecord(
    updateTenantHouseUnitRentRevocationRecordOptions: UpdateTenantHouseUnitRentRevocationRecordOptions
  ): Promise<TenantHouseUnitRentRevocation | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateTenantHouseUnitRentRevocationRecordOptions

    const tenantHouseUnitRentRevocation =
      await this.getTenantHouseUnitRentRevocationRecord(identifierOptions)

    if (tenantHouseUnitRentRevocation === null) {
      return null
    }

    Object.assign(tenantHouseUnitRentRevocation, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      tenantHouseUnitRentRevocation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseUnitRentRevocation.save()

    return tenantHouseUnitRentRevocation
  }

  /**
   * @description Method to delete an TenantHouseUnitRentRevocation record
   * @author DP
   * @static
   * @param {DeleteTenantHouseUnitRentRevocationRecordOptions} deleteTenantHouseUnitRentRevocationRecordOptions
   * @return {*}
   * @memberof TenantHouseUnitRentRevocationActions
   */
  public static async deleteTenantHouseUnitRentRevocationRecord(
    deleteTenantHouseUnitRentRevocationRecordOptions: DeleteTenantHouseUnitRentRevocationRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } =
      deleteTenantHouseUnitRentRevocationRecordOptions

    const tenantHouseUnitRentRevocation =
      await this.getTenantHouseUnitRentRevocationRecord(identifierOptions)

    if (tenantHouseUnitRentRevocation === null) return

    if (dbTransactionOptions.useTransaction) {
      tenantHouseUnitRentRevocation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseUnitRentRevocation.softDelete()
  }

  /**
   * @description Method to list TenantHouseUnitRentRevocations
   * @author DP
   * @static
   * @param {ListTenantHouseUnitRentRevocationRecordOptions} listTenantHouseUnitRentRevocationRecordOptions
   * @return {*}  {Promise<{ tenantHouseUnitRentRevocationPayload: TenantHouseUnitRentRevocation[]; paginationMeta?: any }>}
   * @memberof TenantHouseUnitRentRevocationActions
   */
  public static async listTenantHouseUnitRentRevocations(
    listTenantHouseUnitRentRevocationRecordOptions: ListTenantHouseUnitRentRevocationRecordOptions
  ): Promise<{
    tenantHouseUnitRentRevocationPayload: TenantHouseUnitRentRevocation[]
    paginationMeta?: any
  }> {
    const { paginationOptions } = listTenantHouseUnitRentRevocationRecordOptions
    const tenantHouseUnitRentRevocationQuery = TenantHouseUnitRentRevocation.query()
      .preload('tenant')
      .preload('landlord')
      .preload('houseUnit')
      .orderBy('created_at', 'asc')

    if (paginationOptions) {
      const TenantHouseUnitRentRevocations = await tenantHouseUnitRentRevocationQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        tenantHouseUnitRentRevocationPayload: TenantHouseUnitRentRevocations.all(),
        paginationMeta: TenantHouseUnitRentRevocations.getMeta(),
      }
    }

    const TenantHouseUnitRentRevocations = await tenantHouseUnitRentRevocationQuery
    return {
      tenantHouseUnitRentRevocationPayload: TenantHouseUnitRentRevocations,
    }
  }
}
