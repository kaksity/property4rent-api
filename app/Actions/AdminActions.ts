import Admin from 'App/Models/Admin'
import AdminRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Admin/AdminRecordIdentifierOptions'
import CreateAdminRecordOptions from 'App/Typechecking/ModelManagement/Admin/CreateAdminRecordOptions'
import DeleteAdminRecordOptions from 'App/Typechecking/ModelManagement/Admin/DeleteAdminRecordOptions'
import ListAdminRecordOptions from 'App/Typechecking/ModelManagement/Admin/ListAdminRecordOptions'
import UpdateAdminRecordOptions from 'App/Typechecking/ModelManagement/Admin/UpdateAdminRecordOptions'

export default class AdminActions {

  /**
   * @description Method to create a new admin
   * @author DP
   * @static
   * @param {CreateAdminRecordOptions} createAdminRecordOptions
   * @return {*}  {Promise<Admin>}
   * @memberof AdminActions
   */
  public static async createAdminRecord(
    createAdminRecordOptions: CreateAdminRecordOptions
  ): Promise<Admin> {
    const { createPayload, dbTransactionOptions } = createAdminRecordOptions

    const admin = new Admin()

    Object.assign(admin, createPayload)

    if (dbTransactionOptions.useTransaction) {
      admin.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await admin.save()

    return admin
  }

  /**
   * @description Method to get an admin by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<Admin | null>)}
   * @memberof AdminActions
   */
  public static async getAdminById(id: number): Promise<Admin | null> {
    return Admin.query().where('id', id).first()
  }

/**
 * @description Method to get admin by identifier
 * @author DP
 * @static
 * @param {string} identifier
 * @return {*}  {(Promise<Admin | null>)}
 * @memberof AdminActions
 */
public static async getAdminByIdentifier(identifier: string): Promise<Admin | null> {
    return Admin.query().where('identifier', identifier).first()
  }

  /**
   * @description Method to get admin by email address
   * @author DP
   * @static
   * @param {string} emailAddress
   * @return {*}  {(Promise<Admin | null>)}
   * @memberof AdminActions
   */
  public static async getAdminByEmailAddress(emailAddress: string): Promise<Admin | null> {
    return Admin.query().where('email', emailAddress).first()
  }

  /**
   * @description Method to get an admin record
   * @author DP
   * @static
   * @param {AdminRecordIdentifierOptions} adminRecordIdentifierOptions
   * @return {*}  {(Promise<Admin | null>)}
   * @memberof AdminActions
   */
  public static async getAdminRecord(
    adminRecordIdentifierOptions: AdminRecordIdentifierOptions
  ): Promise<Admin | null> {
    const { identifierType, identifier } = adminRecordIdentifierOptions

    const GetAdminRecord: Record<string, Function> = {
      id: async () => await this.getAdminById(Number(identifier)),
      identifier: async () => await this.getAdminByIdentifier(String(identifier)),
      email: async () => await this.getAdminByEmailAddress(String(identifier)),
    }

    return GetAdminRecord[identifierType]()
  }

  /**
   * @description Method to update an admin record
   * @author DP
   * @static
   * @param {UpdateAdminRecordOptions} updateAdminRecordOptions
   * @return {*}  {(Promise<Admin | null>)}
   * @memberof AdminActions
   */
  public static async updateAdminRecord(
    updateAdminRecordOptions: UpdateAdminRecordOptions
  ): Promise<Admin | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } = updateAdminRecordOptions

    const admin = await this.getAdminRecord(identifierOptions)

    if (admin === null) {
      return null
    }

    Object.assign(admin, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      admin.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await admin.save()

    return admin
  }

/**
 * @description Method to delete an admin record
 * @author DP
 * @static
 * @param {DeleteAdminRecordOptions} deleteAdminRecordOptions
 * @return {*} 
 * @memberof AdminActions
 */
public static async deleteAdminRecord(deleteAdminRecordOptions: DeleteAdminRecordOptions): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteAdminRecordOptions

    const admin = await this.getAdminRecord(identifierOptions)

    if (admin === null) return

    if (dbTransactionOptions.useTransaction) {
      admin.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await admin.softDelete()
  }

/**
 * @description Method to list admins
 * @author DP
 * @static
 * @param {ListAdminRecordOptions} listAdminRecordOptions
 * @return {*}  {Promise<{ adminPayload: Admin[]; paginationMeta?: any }>}
 * @memberof AdminActions
 */
public static async listAdmins(
    listAdminRecordOptions: ListAdminRecordOptions
  ): Promise<{ adminPayload: Admin[]; paginationMeta?: any }> {
    const { paginationOptions } = listAdminRecordOptions
    const adminQuery = Admin.query().orderBy('created_at', 'asc')

    if (paginationOptions) {
      const admins = await adminQuery.paginate(paginationOptions.page, paginationOptions.limit)
      return {
        adminPayload: admins.all(),
        paginationMeta: admins.getMeta(),
      }
    }

    const admins = await adminQuery
    return {
      adminPayload: admins,
    }
  }
}
