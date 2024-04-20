import TenantWallet from 'App/Models/TenantWallet'
import TenantWalletRecordIdentifierOptions from 'App/Typechecking/ModelManagement/TenantWallet/TenantWalletRecordIdentifierOptions'
import CreateTenantWalletRecordOptions from 'App/Typechecking/ModelManagement/TenantWallet/CreateTenantWalletRecordOptions'
import DeleteTenantWalletRecordOptions from 'App/Typechecking/ModelManagement/TenantWallet/DeleteTenantWalletRecordOptions'
import ListTenantWalletRecordOptions from 'App/Typechecking/ModelManagement/TenantWallet/ListTenantWalletRecordOptions'
import UpdateTenantWalletRecordOptions from 'App/Typechecking/ModelManagement/TenantWallet/UpdateTenantWalletRecordOptions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'

export default class TenantWalletActions {
  public static async createTenantWalletRecord(
    createTenantWalletRecordOptions: CreateTenantWalletRecordOptions
  ): Promise<TenantWallet> {
    const { createPayload, dbTransactionOptions } = createTenantWalletRecordOptions

    const tenantWallet = new TenantWallet()

    Object.assign(tenantWallet, createPayload)

    if (dbTransactionOptions.useTransaction) {
      tenantWallet.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantWallet.save()

    return tenantWallet
  }

  public static async getTenantWalletById(id: number): Promise<TenantWallet | null> {
    return TenantWallet.query().preload('tenant').where('id', id).first()
  }

  public static async getTenantWalletByTenantId(tenantId: number): Promise<TenantWallet | null> {
    return TenantWallet.query().preload('tenant').where('tenant_id', tenantId).first()
  }

  public static async getTenantWalletByIdentifier(
    identifier: string
  ): Promise<TenantWallet | null> {
    return TenantWallet.query().preload('tenant').where('identifier', identifier).first()
  }

  public static async getTenantWalletRecord(
    TenantWalletRecordIdentifierOptions: TenantWalletRecordIdentifierOptions
  ): Promise<TenantWallet | null> {
    const { identifierType, identifier } = TenantWalletRecordIdentifierOptions

    const GetTenantWalletRecord: Record<string, Function> = {
      id: async () => await this.getTenantWalletById(Number(identifier)),
      identifier: async () => await this.getTenantWalletByIdentifier(String(identifier)),
      tenantId: async () => await this.getTenantWalletByTenantId(Number(identifier)),
    }

    return GetTenantWalletRecord[identifierType]()
  }

  public static async updateTenantWalletRecord(
    updateTenantWalletRecordOptions: UpdateTenantWalletRecordOptions
  ): Promise<TenantWallet | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateTenantWalletRecordOptions

    const tenantWallet = await this.getTenantWalletRecord(identifierOptions)

    if (tenantWallet === null) {
      return null
    }

    Object.assign(tenantWallet, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      tenantWallet.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantWallet.save()

    return tenantWallet
  }

  public static async deleteTenantWalletRecord(
    deleteTenantWalletRecordOptions: DeleteTenantWalletRecordOptions
  ) {
    const { identifierOptions, dbTransactionOptions } = deleteTenantWalletRecordOptions

    const tenantWallet = await this.getTenantWalletRecord(identifierOptions)

    if (tenantWallet === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      tenantWallet.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await tenantWallet.softDelete()
  }

  public static async listTenantWallets(
    listTenantWalletRecordOptions: ListTenantWalletRecordOptions
  ): Promise<{ tenantWalletPayload: TenantWallet[]; paginationMeta?: any }> {
    const { filterRecordOptions, paginationOptions } = listTenantWalletRecordOptions
    const tenantWalletQuery = TenantWallet.query().preload('tenant').orderBy('created_at', 'asc')

    if (typeof filterRecordOptions?.hasActivatedAccount === 'boolean') {
      tenantWalletQuery.where('has_activated_account', filterRecordOptions.hasActivatedAccount)
    }

    if (paginationOptions) {
      const TenantWallets = await tenantWalletQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        tenantWalletPayload: TenantWallets.all(),
        paginationMeta: TenantWallets.getMeta(),
      }
    }

    const TenantWallets = await tenantWalletQuery
    return {
      tenantWalletPayload: TenantWallets,
    }
  }

  /**
   * @description Method to generate landlord wallet account number
   * @author DP
   * @static
   * @return {*}  {string}
   * @memberof TenantWalletActions
   */
  public static generateTenantWalletAccountNumber(): string {
    const randomNumber = generateRandomString({
      isCapitalized: true,
      charset: 'numeric',
      length: 10,
    })

    return `TAN${randomNumber}`
  }
}
