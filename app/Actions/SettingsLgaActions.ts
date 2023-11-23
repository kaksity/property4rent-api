import CreateSettingsLgaRecordOptions from 'App/Typechecking/ModelManagement/SettingsLga/CreateSettingsLgaRecordOptions'
import SettingsLga from 'App/Models/SettingsLga'
import ListSettingsLgaRecordOptions from 'App/Typechecking/ModelManagement/SettingsLga/ListSettingsLgaRecordOptions'
import SettingsLgaRecordIdentifierOptions from 'App/Typechecking/ModelManagement/SettingsLga/SettingsLgaRecordIdentifierOptions'
import DeleteSettingsLgaRecordOptions from 'App/Typechecking/ModelManagement/SettingsLga/DeleteSettingsLgaRecordOptions'
import UpdateSettingsLgaRecordOptions from 'App/Typechecking/ModelManagement/SettingsLga/UpdateSettingsLgaRecordOptions'
import { NULL_OBJECT } from 'App/Helpers/Messages/SystemMessage'

export default class SettingsLgaActions {
  public static async createSettingsLgaRecord(
    createSettingsLgaRecordOptions: CreateSettingsLgaRecordOptions
  ): Promise<SettingsLga> {
    const { createPayload, dbTransactionOptions } = createSettingsLgaRecordOptions

    const settingsLga = new SettingsLga()

    Object.assign(settingsLga, createPayload)

    if (dbTransactionOptions.useTransaction) {
      settingsLga.useTransaction(dbTransactionOptions.dbTransaction)
    }

    return await settingsLga.save()
  }

  private static async getSettingsLgaRecordById(id: number) {
    return await SettingsLga.query().preload('state').where('id', id).first()
  }

  private static async getSettingsLgaRecordByIdentifier(identifier: string) {
    return await SettingsLga.query().preload('state').where('identifier', identifier).first()
  }

  public static async getSettingsLgaRecord(
    settingsLgaRecordIdentifierOptions: SettingsLgaRecordIdentifierOptions
  ): Promise<SettingsLga | null> {
    const { identifier, identifierType } = settingsLgaRecordIdentifierOptions

    const GetSettingsLga: Record<string, Function> = {
      id: async () => await this.getSettingsLgaRecordById(Number(identifier)),

      identifier: async () => await this.getSettingsLgaRecordByIdentifier(String(identifier)),
    }

    return await GetSettingsLga[identifierType]()
  }

  public static async updateSettingsLgaRecord(
    updateSettingsLgaRecordOptions: UpdateSettingsLgaRecordOptions
  ): Promise<SettingsLga | null> {
    const { updatePayload, identifierOptions, dbTransactionOptions } =
      updateSettingsLgaRecordOptions

    const settingsLga = await this.getSettingsLgaRecord(identifierOptions)

    if (settingsLga === NULL_OBJECT) {
      return NULL_OBJECT
    }

    Object.assign(settingsLga, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      settingsLga.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await settingsLga.save()

    return settingsLga
  }

  public static async deleteSettingsLgaRecord(
    deleteSettingsLgaRecordOptions: DeleteSettingsLgaRecordOptions
  ) {
    const { identifierOptions, dbTransactionOptions } = deleteSettingsLgaRecordOptions

    const settingsLga = await this.getSettingsLgaRecord(identifierOptions)

    if (settingsLga === NULL_OBJECT) {
      return
    }

    if (dbTransactionOptions.useTransaction) {
      settingsLga.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await settingsLga.softDelete()
  }

  public static async listSettingsLgas(
    listSettingsLgaRecordOptions: ListSettingsLgaRecordOptions
  ): Promise<{ settingsLgaPayload: SettingsLga[]; paginationMeta?: any }> {
    const { filterRecordOptions, paginationOptions } = listSettingsLgaRecordOptions

    const lgaQuery = SettingsLga.query().orderBy('lga_label', 'asc')

    if (filterRecordOptions?.stateId) {
      lgaQuery.where('state_id', filterRecordOptions.stateId)
    }

    if (paginationOptions) {
      const lgas = await lgaQuery.paginate(paginationOptions.page, paginationOptions.limit)

      return {
        settingsLgaPayload: lgas.all(),
        paginationMeta: lgas.getMeta(),
      }
    }

    const lgas = await lgaQuery

    return {
      settingsLgaPayload: lgas,
    }
  }
}
