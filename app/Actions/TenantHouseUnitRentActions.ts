import TenantHouseUnitRent from 'App/Models/TenantHouseUnitRent'
import TenantHouseUnitRentRecordIdentifierOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRent/TenantHouseUnitRentRecordIdentifierOptions'
import CreateTenantHouseUnitRentRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRent/CreateTenantHouseUnitRentRecordOptions'
import DeleteTenantHouseUnitRentRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRent/DeleteTenantHouseUnitRentRecordOptions'
import ListTenantHouseUnitRentRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRent/ListTenantHouseUnitRentRecordOptions'
import UpdateTenantHouseUnitRentRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRent/UpdateTenantHouseUnitRentRecordOptions'
import GetTenantHouseUnitRentDistinctRecordOptions from 'App/Typechecking/ModelManagement/TenantHouseUnitRent/GetTenantHouseUnitRentDistinctRecordOptions'

export default class TenantHouseUnitRentActions {
  /**
   * @description Method to create a new tenant house rent
   * @author DP
   * @static
   * @param {CreateTenantHouseUnitRentRecordOptions} createTenantHouseUnitRentRecordOptions
   * @return {*}  {Promise<TenantHouseUnitRent>}
   * @memberof TenantHouseUnitRentActions
   */
  public static async createTenantHouseUnitRentRecord(
    createTenantHouseUnitRentRecordOptions: CreateTenantHouseUnitRentRecordOptions
  ): Promise<TenantHouseUnitRent> {
    const { createPayload, dbTransactionOptions } = createTenantHouseUnitRentRecordOptions

    const tenantHouseUnitRent = new TenantHouseUnitRent()

    Object.assign(tenantHouseUnitRent, createPayload)

    if (dbTransactionOptions.useTransaction) {
      tenantHouseUnitRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseUnitRent.save()

    return tenantHouseUnitRent
  }

  /**
   * @description Method to get an tenant house rent by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<TenantHouseUnitRent | null>)}
   * @memberof TenantHouseUnitRentActions
   */
  public static async getTenantHouseUnitRentById(id: number): Promise<TenantHouseUnitRent | null> {
    return TenantHouseUnitRent.query()
      .preload('landlord')
      .preload('tenant')
      .preload('houseUnit', (houseUnitQuery) => {
        houseUnitQuery.preload('house')
      })
      .where('id', id)
      .first()
  }

  /**
   * @description Method to get tenant house rent by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<TenantHouseUnitRent | null>)}
   * @memberof TenantHouseUnitRentActions
   */
  public static async getTenantHouseUnitRentByIdentifier(
    identifier: string
  ): Promise<TenantHouseUnitRent | null> {
    return TenantHouseUnitRent.query()
      .preload('landlord')
      .preload('tenant')
      .preload('houseUnit', (houseUnitQuery) => {
        houseUnitQuery.preload('house')
      })
      .where('identifier', identifier)
      .first()
  }

  /**
   * @description Method to get an tenant house rent record
   * @author DP
   * @static
   * @param {TenantHouseUnitRentRecordIdentifierOptions} TenantHouseUnitRentRecordIdentifierOptions
   * @return {*}  {(Promise<TenantHouseUnitRent | null>)}
   * @memberof TenantHouseUnitRentActions
   */
  public static async getTenantHouseUnitRentRecord(
    TenantHouseUnitRentRecordIdentifierOptions: TenantHouseUnitRentRecordIdentifierOptions
  ): Promise<TenantHouseUnitRent | null> {
    const { identifierType, identifier } = TenantHouseUnitRentRecordIdentifierOptions

    const GetTenantHouseUnitRentRecord: Record<string, Function> = {
      id: async () => await this.getTenantHouseUnitRentById(Number(identifier)),
      identifier: async () => await this.getTenantHouseUnitRentByIdentifier(String(identifier)),
    }

    return GetTenantHouseUnitRentRecord[identifierType]()
  }

  /**
   * @description Method to update an tenant house rent record
   * @author DP
   * @static
   * @param {UpdateTenantHouseUnitRentRecordOptions} updateTenantHouseUnitRentRecordOptions
   * @return {*}  {(Promise<TenantHouseUnitRent | null>)}
   * @memberof TenantHouseUnitRentActions
   */
  public static async updateTenantHouseUnitRentRecord(
    updateTenantHouseUnitRentRecordOptions: UpdateTenantHouseUnitRentRecordOptions
  ): Promise<TenantHouseUnitRent | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateTenantHouseUnitRentRecordOptions

    const tenantHouseUnitRent = await this.getTenantHouseUnitRentRecord(identifierOptions)

    if (tenantHouseUnitRent === null) {
      return null
    }

    Object.assign(tenantHouseUnitRent, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      tenantHouseUnitRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseUnitRent.save()

    return tenantHouseUnitRent
  }

  /**
   * @description Method to delete an tenant house rent record
   * @author DP
   * @static
   * @param {DeleteTenantHouseUnitRentRecordOptions} deleteTenantHouseUnitRentRecordOptions
   * @return {*}
   * @memberof TenantHouseUnitRentActions
   */
  public static async deleteTenantHouseUnitRentRecord(
    deleteTenantHouseUnitRentRecordOptions: DeleteTenantHouseUnitRentRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteTenantHouseUnitRentRecordOptions

    const tenantHouseUnitRent = await this.getTenantHouseUnitRentRecord(identifierOptions)

    if (tenantHouseUnitRent === null) return

    if (dbTransactionOptions.useTransaction) {
      tenantHouseUnitRent.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantHouseUnitRent.softDelete()
  }

  /**
   * @description Method to list tenant house rents
   * @author DP
   * @static
   * @param {ListTenantHouseUnitRentRecordOptions} listTenantHouseUnitRentRecordOptions
   * @return {*}  {Promise<{ tenantHouseUnitRentPayload: TenantHouseUnitRent[]; paginationMeta?: any }>}
   * @memberof TenantHouseUnitRentActions
   */
  public static async listTenantHouseUnitRents(
    listTenantHouseUnitRentRecordOptions: ListTenantHouseUnitRentRecordOptions
  ): Promise<{ tenantHouseUnitRentPayload: TenantHouseUnitRent[]; paginationMeta?: any }> {
    const { filterRecordOptions, paginationOptions } = listTenantHouseUnitRentRecordOptions
    const tenantHouseUnitRentQuery = TenantHouseUnitRent.query()
      .preload('landlord')
      .preload('tenant')
      .preload('houseUnit', (houseUnitQuery) => {
        houseUnitQuery.preload('house')
      })
      .orderBy('updated_at', 'desc')

    if (filterRecordOptions?.houseUnitId) {
      tenantHouseUnitRentQuery.where('house_unit_id', filterRecordOptions.houseUnitId)
    }

    if (filterRecordOptions?.tenantId) {
      tenantHouseUnitRentQuery.where('tenant_id', filterRecordOptions.tenantId)
    }

    if (filterRecordOptions?.landlordId) {
      tenantHouseUnitRentQuery.where('landlord_id', filterRecordOptions.landlordId)
    }

    if (filterRecordOptions?.rentStatus) {
      tenantHouseUnitRentQuery.where('rent_status', filterRecordOptions.rentStatus)
    }

    if (paginationOptions) {
      const tenantHouseUnitRents = await tenantHouseUnitRentQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        tenantHouseUnitRentPayload: tenantHouseUnitRents.all(),
        paginationMeta: tenantHouseUnitRents.getMeta(),
      }
    }

    const tenantHouseUnitRents = await tenantHouseUnitRentQuery
    return {
      tenantHouseUnitRentPayload: tenantHouseUnitRents,
    }
  }

  /**
   * @description Method to get distinct house unit rent information
   * @author DP
   * @param {GetTenantHouseUnitRentDistinctRecordOptions} getTenantHouseUnitRentDistinctRecordOptions
   * @return {*}  {(Promise<TenantHouseUnitRent | null>)}
   * @memberof TenantHouseUnitRentActions
   */
  public static async getTenantHouseUnitRentDistinct(
    getTenantHouseUnitRentDistinctRecordOptions: GetTenantHouseUnitRentDistinctRecordOptions
  ): Promise<TenantHouseUnitRent | null> {
    const { houseUnitId, tenantId, landlordId } = getTenantHouseUnitRentDistinctRecordOptions
    return await TenantHouseUnitRent.query()
      .preload('tenant')
      .preload('houseUnit')
      .preload('landlord')
      .where('house_unit_id', houseUnitId)
      .where('tenant_id', tenantId)
      .where('landlord_id', landlordId)
      .orderBy('updated_at', 'desc')
      .first()
  }
}
