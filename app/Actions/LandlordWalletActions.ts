import LandlordWallet from 'App/Models/LandlordWallet'
import LandlordWalletRecordIdentifierOptions from 'App/Typechecking/ModelManagement/LandlordWallet/LandlordWalletRecordIdentifierOptions'
import CreateLandlordWalletRecordOptions from 'App/Typechecking/ModelManagement/LandlordWallet/CreateLandlordWalletRecordOptions'
import DeleteLandlordWalletRecordOptions from 'App/Typechecking/ModelManagement/LandlordWallet/DeleteLandlordWalletRecordOptions'
import ListLandlordWalletRecordOptions from 'App/Typechecking/ModelManagement/LandlordWallet/ListLandlordWalletRecordOptions'
import UpdateLandlordWalletRecordOptions from 'App/Typechecking/ModelManagement/LandlordWallet/UpdateLandlordWalletRecordOptions'
import generateRandomString from 'App/Helpers/Functions/generateRandomString'

export default class LandlordWalletActions {
  public static async createLandlordWalletRecord(
    createLandlordWalletRecordOptions: CreateLandlordWalletRecordOptions
  ): Promise<LandlordWallet> {
    const { createPayload, dbTransactionOptions } = createLandlordWalletRecordOptions

    const landlordWallet = new LandlordWallet()

    Object.assign(landlordWallet, createPayload)

    if (dbTransactionOptions.useTransaction) {
      landlordWallet.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlordWallet.save()

    return landlordWallet
  }

  public static async getLandlordWalletById(id: number): Promise<LandlordWallet | null> {
    return LandlordWallet.query().preload('landlord').where('id', id).first()
  }

  public static async getLandlordWalletByLandlordId(
    landlordId: number
  ): Promise<LandlordWallet | null> {
    return LandlordWallet.query().preload('landlord').where('landlord_id', landlordId).first()
  }

  public static async getLandlordWalletByIdentifier(
    identifier: string
  ): Promise<LandlordWallet | null> {
    return LandlordWallet.query().preload('landlord').where('identifier', identifier).first()
  }

  public static async getLandlordWalletRecord(
    LandlordWalletRecordIdentifierOptions: LandlordWalletRecordIdentifierOptions
  ): Promise<LandlordWallet | null> {
    const { identifierType, identifier } = LandlordWalletRecordIdentifierOptions

    const GetLandlordWalletRecord: Record<string, Function> = {
      id: async () => await this.getLandlordWalletById(Number(identifier)),
      identifier: async () => await this.getLandlordWalletByIdentifier(String(identifier)),
      landlordId: async () => await this.getLandlordWalletByLandlordId(Number(identifier)),
    }

    return GetLandlordWalletRecord[identifierType]()
  }

  public static async updateLandlordWalletRecord(
    updateLandlordWalletRecordOptions: UpdateLandlordWalletRecordOptions
  ): Promise<LandlordWallet | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateLandlordWalletRecordOptions

    const landlordWallet = await this.getLandlordWalletRecord(identifierOptions)

    if (landlordWallet === null) {
      return null
    }

    Object.assign(landlordWallet, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      landlordWallet.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlordWallet.save()

    return landlordWallet
  }

  public static async deleteLandlordWalletRecord(
    deleteLandlordWalletRecordOptions: DeleteLandlordWalletRecordOptions
  ) {
    const { identifierOptions, dbTransactionOptions } = deleteLandlordWalletRecordOptions

    const landlordWallet = await this.getLandlordWalletRecord(identifierOptions)

    if (landlordWallet === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      landlordWallet.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlordWallet.softDelete()
  }

  public static async listLandlordWallets(
    listLandlordWalletRecordOptions: ListLandlordWalletRecordOptions
  ): Promise<{ landlordWalletPayload: LandlordWallet[]; paginationMeta?: any }> {
    const { filterRecordOptions, paginationOptions } = listLandlordWalletRecordOptions
    const landlordWalletQuery = LandlordWallet.query()
      .preload('landlord')
      .orderBy('created_at', 'asc')

    if (typeof filterRecordOptions?.hasActivatedAccount === 'boolean') {
      landlordWalletQuery.where('has_activated_account', filterRecordOptions.hasActivatedAccount)
    }

    if (paginationOptions) {
      const landlordWallets = await landlordWalletQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        landlordWalletPayload: landlordWallets.all(),
        paginationMeta: landlordWallets.getMeta(),
      }
    }

    const landlordWallets = await landlordWalletQuery
    return {
      landlordWalletPayload: landlordWallets,
    }
  }

  /**
   * @description Method to generate landlord wallet account number
   * @author DP
   * @static
   * @return {*}  {string}
   * @memberof LandlordWalletActions
   */
  public static generateLandlordWalletAccountNumber(): string {
    const randomNumber = generateRandomString({
      isCapitalized: true,
      charset: 'numeric',
      length: 10,
    })

    return `LAN${randomNumber}`
  }
}
