import TenantHouseRent from 'App/Models/TenantHouseRent'
import TenantHouseRentRecordIdentifierOptions from 'App/Typechecking/ModelManagement/TenantHouseRent/TenantHouseRentRecordIdentifierOptions'
import CreateTenantHouseRentRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseRent/CreateTenantHouseRentRecordOptions'
import DeleteTenantHouseRentRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseRent/DeleteTenantHouseRentRecordOptions'
import ListTenantHouseRentRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseRent/ListTenantHouseRentRecordOptions'
import UpdateTenantHouseRentRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseRent/UpdateTenantHouseRentRecordOptions'
import GetTenantHouseRentDistinctRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseRent/GetTenantHouseRentDistinctRecordOptions'

export default class TenantHouseRentActions {
  /**
   * @description Method to create a new tenant house rent
   * @author DP
   * @static
   * @param {CreateTenantHouseRentRecordOptions} createTenantHouseRentRecordOptions
   * @return {*}  {Promise<TenantHouseRent>}
   * @memberof TenantHouseRentActions
   */
  public static async createTenantHouseRentRecord(
    createTenantHouseRentRecordOptions: CreateTenantHouseRentRecordOptions
  ): Promise<TenantHouseRent> {
    const { createPayload, dbTransactionOptions } = createTenantHouseRentRecordOptions

    const tenantHouseRent = new TenantHouseRent()

    Object.assign(tenantHouseRent, createPayload)

    if (dbTransactionOptions.useTransaction) {
      tenantHouseRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseRent.save()

    return tenantHouseRent
  }

  /**
   * @description Method to get an tenant house rent by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<TenantHouseRent | null>)}
   * @memberof TenantHouseRentActions
   */
  public static async getTenantHouseRentById(id: number): Promise<TenantHouseRent | null> {
    return TenantHouseRent.query().where('id', id).first()
  }

  /**
   * @description Method to get tenant house rent by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<TenantHouseRent | null>)}
   * @memberof TenantHouseRentActions
   */
  public static async getTenantHouseRentByIdentifier(
    identifier: string
  ): Promise<TenantHouseRent | null> {
    return TenantHouseRent.query().where('identifier', identifier).first()
  }

  /**
   * @description Method to get an tenant house rent record
   * @author DP
   * @static
   * @param {TenantHouseRentRecordIdentifierOptions} TenantHouseRentRecordIdentifierOptions
   * @return {*}  {(Promise<TenantHouseRent | null>)}
   * @memberof TenantHouseRentActions
   */
  public static async getTenantHouseRentRecord(
    TenantHouseRentRecordIdentifierOptions: TenantHouseRentRecordIdentifierOptions
  ): Promise<TenantHouseRent | null> {
    const { identifierType, identifier } = TenantHouseRentRecordIdentifierOptions

    const GetTenantHouseRentRecord: Record<string, Function> = {
      id: async () => await this.getTenantHouseRentById(Number(identifier)),
      identifier: async () => await this.getTenantHouseRentByIdentifier(String(identifier)),
    }

    return GetTenantHouseRentRecord[identifierType]()
  }

  /**
   * @description Method to update an tenant house rent record
   * @author DP
   * @static
   * @param {UpdateTenantHouseRentRecordOptions} updateTenantHouseRentRecordOptions
   * @return {*}  {(Promise<TenantHouseRent | null>)}
   * @memberof TenantHouseRentActions
   */
  public static async updateTenantHouseRentRecord(
    updateTenantHouseRentRecordOptions: UpdateTenantHouseRentRecordOptions
  ): Promise<TenantHouseRent | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateTenantHouseRentRecordOptions

    const tenantHouseRent = await this.getTenantHouseRentRecord(identifierOptions)

    if (tenantHouseRent === null) {
      return null
    }

    Object.assign(tenantHouseRent, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      tenantHouseRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseRent.save()

    return tenantHouseRent
  }

  /**
   * @description Method to delete an tenant house rent record
   * @author DP
   * @static
   * @param {DeleteTenantHouseRentRecordOptions} deleteTenantHouseRentRecordOptions
   * @return {*}
   * @memberof TenantHouseRentActions
   */
  public static async deleteTenantHouseRentRecord(
    deleteTenantHouseRentRecordOptions: DeleteTenantHouseRentRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteTenantHouseRentRecordOptions

    const tenantHouseRent = await this.getTenantHouseRentRecord(identifierOptions)

    if (tenantHouseRent === null) return

    if (dbTransactionOptions.useTransaction) {
      tenantHouseRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseRent.softDelete()
  }

  /**
   * @description Method to list tenant house rents
   * @author DP
   * @static
   * @param {ListTenantHouseRentRecordOptions} listTenantHouseRentRecordOptions
   * @return {*}  {Promise<{ tenantHouseRentPayload: TenantHouseRent[]; paginationMeta?: any }>}
   * @memberof TenantHouseRentActions
   */
  public static async listTenantHouseRents(
    listTenantHouseRentRecordOptions: ListTenantHouseRentRecordOptions
  ): Promise<{ tenantHouseRentPayload: TenantHouseRent[]; paginationMeta?: any }> {
    const { filterRecordOptions, paginationOptions } = listTenantHouseRentRecordOptions
    const tenantHouseRentQuery = TenantHouseRent.query().orderBy('created_at', 'asc')

    if (filterRecordOptions?.houseUnitId) {
      tenantHouseRentQuery.where('house_unit_id', filterRecordOptions.houseUnitId)
    }

    if (filterRecordOptions?.tenantId) {
      tenantHouseRentQuery.where('tenant_id', filterRecordOptions.tenantId)
    }

    if (paginationOptions) {
      const tenantHouseRents = await tenantHouseRentQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        tenantHouseRentPayload: tenantHouseRents.all(),
        paginationMeta: tenantHouseRents.getMeta(),
      }
    }

    const tenantHouseRents = await tenantHouseRentQuery
    return {
      tenantHouseRentPayload: tenantHouseRents,
    }
  }

  /**
   * @description Method to get distinct house unit rent information
   * @author DP
   * @param {GetTenantHouseRentDistinctRecordOptions} getTenantHouseRentDistinctRecordOptions
   * @return {*}  {(Promise<TenantHouseRent | null>)}
   * @memberof TenantHouseRentActions
   */
  public static async getTenantHouseRentDistinct(
    getTenantHouseRentDistinctRecordOptions: GetTenantHouseRentDistinctRecordOptions
  ): Promise<TenantHouseRent | null> {
    const { houseUnitId, tenantId } = getTenantHouseRentDistinctRecordOptions
    return await TenantHouseRent.query()
      .where('house_unit_id', houseUnitId)
      .where('tenant_id', tenantId)
      .orderBy('updated_at', 'desc')
      .first()
  }
}
