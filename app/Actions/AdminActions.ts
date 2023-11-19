import Admin from 'App/Models/Admin'
import AdminRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Admin/AdminRecordIdentifierOptions'
import CreateAdminRecordOptions from 'App/Typechecking/ModelManagement/Admin/CreateAdminRecordOptions'
import DeleteAdminRecordOptions from 'App/Typechecking/ModelManagement/Admin/DeleteAdminRecordOptions'
import ListAdminRecordOptions from 'App/Typechecking/ModelManagement/Admin/ListAdminRecordOptions'
import UpdateAdminRecordOptions from 'App/Typechecking/ModelManagement/Admin/UpdateAdminRecordOptions'

export default class AdminActions {
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

  public static async getAdminById(id: number): Promise<Admin | null> {
    return Admin.query().where('id', id).first()
  }

  public static async getAdminByIdentifier(identifier: string): Promise<Admin | null> {
    return Admin.query().where('identifier', identifier).first()
  }

  public static async getAdminRecord(
    adminRecordIdentifierOptions: AdminRecordIdentifierOptions
  ): Promise<Admin | null> {
    const { identifierType, identifier } = adminRecordIdentifierOptions

    const GetAdminRecord: Record<string, Function> = {
      id: async () => await this.getAdminById(Number(identifier)),
      identifier: async () => await this.getAdminByIdentifier(String(identifier)),
    }

    return GetAdminRecord[identifierType]()
  }

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

  public static async deleteAdminRecord(deleteAdminRecordOptions: DeleteAdminRecordOptions) {
    const { identifierOptions, dbTransactionOptions } = deleteAdminRecordOptions

    const admin = await this.getAdminRecord(identifierOptions)

    if (admin === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      admin.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await admin.softDelete()
  }

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
