import CreateSettingsStateRecordOptions from 'App/Typechecking/ModelManagement/SettingsState/CreateSettingsStateRecordOptions'
import SettingsState from 'App/Models/SettingsState'
import SettingsStateRecordIdentifierOptions from 'App/Typechecking/ModelManagement/SettingsState/SettingsStateRecordIdentifierOptions'
import UpdateSettingsStateRecordOptions from 'App/Typechecking/ModelManagement/SettingsState/UpdateSettingsStateRecordOptions'
import { NULL_OBJECT } from 'App/Helpers/Messages/SystemMessage'
import ListSettingsStateRecordOptions from 'App/Typechecking/ModelManagement/SettingsState/ListSettingsStateRecordOptions'
import DeleteSettingsStateRecordOptions from 'App/Typechecking/ModelManagement/SettingsState/DeleteSettingsStateRecordOptions'

export default class SettingsStateActions {
  public static async createSettingsStateRecord(
    createSettingsStateRecordOptions: CreateSettingsStateRecordOptions
  ): Promise<SettingsState> {
    const { createPayload, dbTransactionOptions } = createSettingsStateRecordOptions

    const settingsState = new SettingsState()

    Object.assign(settingsState, createPayload)

    if (dbTransactionOptions.useTransaction) {
      settingsState.useTransaction(dbTransactionOptions.dbTransaction)
    }

    return await settingsState.save()
  }

  private static async getSettingsStateRecordById(id: number) {
    return await SettingsState.query().where('id', id).first()
  }

  private static async getSettingsStateRecordByIdentifier(identifier: string) {
    return await SettingsState.query().where('identifier', identifier).first()
  }

  public static async getSettingsStateRecord(
    settingsStateRecordIdentifierOptions: SettingsStateRecordIdentifierOptions
  ): Promise<SettingsState | null> {
    const { identifier, identifierType } = settingsStateRecordIdentifierOptions

    const GetSettingsState: Record<string, Function> = {
      id: async () => await this.getSettingsStateRecordById(Number(identifier)),

      identifier: async () => await this.getSettingsStateRecordByIdentifier(String(identifier)),
    }

    return await GetSettingsState[identifierType]()
  }

  public static async updateStateRecord(
    updateSettingsStateRecordOptions: UpdateSettingsStateRecordOptions
  ): Promise<SettingsState | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateSettingsStateRecordOptions

    const settingsState = await this.getSettingsStateRecord(identifierOptions)

    if (settingsState === NULL_OBJECT) {
      return NULL_OBJECT
    }

    Object.assign(settingsState, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      settingsState.useTransaction(dbTransactionOptions.dbTransaction)
    }
    await settingsState.save()

    return settingsState
  }

  public static async deleteStateRecord(
    deleteSettingsStateRecordOptions: DeleteSettingsStateRecordOptions
  ) {
    const { identifierOptions, dbTransactionOptions } = deleteSettingsStateRecordOptions

    const settingsState = await this.getSettingsStateRecord(identifierOptions)

    if (settingsState === NULL_OBJECT) {
      return
    }

    if (dbTransactionOptions.useTransaction) {
      settingsState.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await settingsState.softDelete()
  }

  public static async listSettingsStates(
    listSettingsStateRecordOptions: ListSettingsStateRecordOptions
  ): Promise<{ settingsStatePayload: SettingsState[]; paginationMeta?: any }> {
    const { paginationOptions } = listSettingsStateRecordOptions
    const settingsStateQuery = SettingsState.query().orderBy('state_label', 'asc')

    if (paginationOptions) {
      const settingsStates = await settingsStateQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )

      return {
        settingsStatePayload: settingsStates.all(),
        paginationMeta: settingsStates.getMeta(),
      }
    }

    const settingsStates = await settingsStateQuery

    return {
      settingsStatePayload: settingsStates,
    }
  }
}
