import Tenant from 'App/Models/Tenant'
import TenantRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Tenant/TenantRecordIdentifierOptions'
import CreateTenantRecordOptions from 'App/Typechecking/ModelManagement/Tenant/CreateTenantRecordOptions'
import DeleteTenantRecordOptions from 'App/Typechecking/ModelManagement/Tenant/DeleteTenantRecordOptions'
import ListTenantRecordOptions from 'App/Typechecking/ModelManagement/Tenant/ListTenantRecordOptions'
import UpdateTenantRecordOptions from 'App/Typechecking/ModelManagement/Tenant/UpdateTenantRecordOptions'

export default class TenantActions {
  /**
   * @description Method to create a new tenant
   * @author DP
   * @static
   * @param {CreateTenantRecordOptions} createTenantRecordOptions
   * @return {*}  {Promise<Tenant>}
   * @memberof TenantActions
   */
  public static async createTenantRecord(
    createTenantRecordOptions: CreateTenantRecordOptions
  ): Promise<Tenant> {
    const { createPayload, dbTransactionOptions } = createTenantRecordOptions

    const tenant = new Tenant()

    Object.assign(tenant, createPayload)

    if (dbTransactionOptions.useTransaction) {
      tenant.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenant.save()

    return tenant
  }

  /**
   * @description Method to get an tenant by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<Tenant | null>)}
   * @memberof TenantActions
   */
  public static async getTenantById(id: number): Promise<Tenant | null> {
    return Tenant.query().preload('createdByLandlord').where('id', id).first()
  }

  /**
   * @description Method to get tenant by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<Tenant | null>)}
   * @memberof TenantActions
   */
  public static async getTenantByIdentifier(identifier: string): Promise<Tenant | null> {
    return Tenant.query().preload('createdByLandlord').where('identifier', identifier).first()
  }

  /**
   * @description Method to get tenant by email address
   * @author DP
   * @static
   * @param {string} emailAddress
   * @return {*}  {(Promise<Tenant | null>)}
   * @memberof TenantActions
   */
  public static async getTenantByEmailAddress(emailAddress: string): Promise<Tenant | null> {
    return Tenant.query().preload('createdByLandlord').where('email', emailAddress).first()
  }

  /**
   * @description Method to get an tenant record
   * @author DP
   * @static
   * @param {TenantRecordIdentifierOptions} TenantRecordIdentifierOptions
   * @return {*}  {(Promise<Tenant | null>)}
   * @memberof TenantActions
   */
  public static async getTenantRecord(
    TenantRecordIdentifierOptions: TenantRecordIdentifierOptions
  ): Promise<Tenant | null> {
    const { identifierType, identifier } = TenantRecordIdentifierOptions

    const GetTenantRecord: Record<string, Function> = {
      id: async () => await this.getTenantById(Number(identifier)),
      identifier: async () => await this.getTenantByIdentifier(String(identifier)),
      email: async () => await this.getTenantByEmailAddress(String(identifier)),
    }

    return GetTenantRecord[identifierType]()
  }

  /**
   * @description Method to update an tenant record
   * @author DP
   * @static
   * @param {UpdateTenantRecordOptions} updateTenantRecordOptions
   * @return {*}  {(Promise<Tenant | null>)}
   * @memberof TenantActions
   */
  public static async updateTenantRecord(
    updateTenantRecordOptions: UpdateTenantRecordOptions
  ): Promise<Tenant | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } = updateTenantRecordOptions

    const tenant = await this.getTenantRecord(identifierOptions)

    if (tenant === null) {
      return null
    }

    Object.assign(tenant, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      tenant.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenant.save()

    return tenant
  }

  /**
   * @description Method to delete an tenant record
   * @author DP
   * @static
   * @param {DeleteTenantRecordOptions} deleteTenantRecordOptions
   * @return {*}
   * @memberof TenantActions
   */
  public static async deleteTenantRecord(
    deleteTenantRecordOptions: DeleteTenantRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteTenantRecordOptions

    const tenant = await this.getTenantRecord(identifierOptions)

    if (tenant === null) return

    if (dbTransactionOptions.useTransaction) {
      tenant.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenant.softDelete()
  }

  /**
   * @description Method to list tenants
   * @author DP
   * @static
   * @param {ListTenantRecordOptions} listTenantRecordOptions
   * @return {*}  {Promise<{ tenantPayload: Tenant[]; paginationMeta?: any }>}
   * @memberof TenantActions
   */
  public static async listTenants(
    listTenantRecordOptions: ListTenantRecordOptions
  ): Promise<{ tenantPayload: Tenant[]; paginationMeta?: any }> {
    const { paginationOptions } = listTenantRecordOptions
    const tenantQuery = Tenant.query().preload('createdByLandlord').orderBy('created_at', 'asc')

    if (paginationOptions) {
      const tenants = await tenantQuery.paginate(paginationOptions.page, paginationOptions.limit)
      return {
        tenantPayload: tenants.all(),
        paginationMeta: tenants.getMeta(),
      }
    }

    const tenants = await tenantQuery
    return {
      tenantPayload: tenants,
    }
  }
}
