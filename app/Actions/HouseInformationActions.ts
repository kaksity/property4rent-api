import HouseInformation from 'App/Models/HouseInformation'
import HouseInformationRecordIdentifierOptions from 'App/Typechecking/ModelManagement/HouseInformation/HouseInformationRecordIdentifierOptions'
import CreateHouseInformationRecordOptions from 'App/Typechecking/ModelManagement/HouseInformation/CreateHouseInformationRecordOptions'
import DeleteHouseInformationRecordOptions from 'App/Typechecking/ModelManagement/HouseInformation/DeleteHouseInformationRecordOptions'
import ListHouseInformationRecordOptions from 'App/Typechecking/ModelManagement/HouseInformation/ListHouseInformationRecordOptions'
import UpdateHouseInformationRecordOptions from 'App/Typechecking/ModelManagement/HouseInformation/UpdateHouseInformationRecordOptions'

export default class HouseInformationActions {
  /**
   * @description Method to create a house information record
   * @author DP
   * @static
   * @param {CreateHouseInformationRecordOptions} createHouseInformationRecordOptions
   * @return {*}  {Promise<HouseInformation>}
   * @memberof HouseInformationActions
   */
  public static async createHouseInformationRecord(
    createHouseInformationRecordOptions: CreateHouseInformationRecordOptions
  ): Promise<HouseInformation> {
    const { createPayload, dbTransactionOptions } = createHouseInformationRecordOptions

    const houseInformation = new HouseInformation()

    Object.assign(houseInformation, createPayload)

    if (dbTransactionOptions.useTransaction) {
      houseInformation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await houseInformation.save()

    return houseInformation
  }

  /**
   * @description Method to get house information by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<HouseInformation | null>)}
   * @memberof HouseInformationActions
   */
  public static async getHouseInformationById(id: number): Promise<HouseInformation | null> {
    return HouseInformation.query().where('id', id).first()
  }

  /**
   * @description Method to get house information by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<HouseInformation | null>)}
   * @memberof HouseInformationActions
   */
  public static async getHouseInformationByIdentifier(
    identifier: string
  ): Promise<HouseInformation | null> {
    return HouseInformation.query().where('identifier', identifier).first()
  }

  /**
   * @description Method to get house information by house id
   * @author DP
   * @static
   * @param {number} HouseId
   * @return {*}  {(Promise<HouseInformation | null>)}
   * @memberof HouseInformationActions
   */
  public static async getHouseInformationByHouseId(
    HouseId: number
  ): Promise<HouseInformation | null> {
    return HouseInformation.query().where('House_id', HouseId).first()
  }

  /**
   * @description Method to get house information record
   * @author DP
   * @static
   * @param {HouseInformationRecordIdentifierOptions} HouseInformationRecordIdentifierOptions
   * @return {*}  {(Promise<HouseInformation | null>)}
   * @memberof HouseInformationActions
   */
  public static async getHouseInformationRecord(
    HouseInformationRecordIdentifierOptions: HouseInformationRecordIdentifierOptions
  ): Promise<HouseInformation | null> {
    const { identifierType, identifier } = HouseInformationRecordIdentifierOptions

    const GetHouseInformationRecord: Record<string, Function> = {
      id: async () => await this.getHouseInformationById(Number(identifier)),
      identifier: async () => await this.getHouseInformationByIdentifier(String(identifier)),
      houseId: async () => await this.getHouseInformationByHouseId(Number(identifier)),
    }

    return GetHouseInformationRecord[identifierType]()
  }

  /**
   * @description Method to update house information
   * @author DP
   * @static
   * @param {UpdateHouseInformationRecordOptions} updateHouseInformationRecordOptions
   * @return {*}  {(Promise<HouseInformation | null>)}
   * @memberof HouseInformationActions
   */
  public static async updateHouseInformationRecord(
    updateHouseInformationRecordOptions: UpdateHouseInformationRecordOptions
  ): Promise<HouseInformation | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateHouseInformationRecordOptions

    const houseInformation = await this.getHouseInformationRecord(identifierOptions)

    if (houseInformation === null) {
      return null
    }

    Object.assign(houseInformation, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      houseInformation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await houseInformation.save()

    return houseInformation
  }

  /**
   * @description Method to delete house information
   * @author DP
   * @static
   * @param {DeleteHouseInformationRecordOptions} deleteHouseInformationRecordOptions
   * @return {*}  {Promise<void>}
   * @memberof HouseInformationActions
   */
  public static async deleteHouseInformationRecord(
    deleteHouseInformationRecordOptions: DeleteHouseInformationRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteHouseInformationRecordOptions

    const houseInformation = await this.getHouseInformationRecord(identifierOptions)

    if (houseInformation === null) return

    if (dbTransactionOptions.useTransaction) {
      houseInformation.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await houseInformation.softDelete()
  }

  /**
   * @description Method to list house information
   * @author DP
   * @static
   * @param {ListHouseInformationRecordOptions} listHouseInformationRecordOptions
   * @return {*}  {Promise<{ HouseInformationPayload: HouseInformation[]; paginationMeta?: any }>}
   * @memberof HouseInformationActions
   */
  public static async listHouseInformation(
    listHouseInformationRecordOptions: ListHouseInformationRecordOptions
  ): Promise<{ HouseInformationPayload: HouseInformation[]; paginationMeta?: any }> {
    const { paginationOptions } = listHouseInformationRecordOptions
    const houseInformationQuery = HouseInformation.query().orderBy('created_at', 'asc')

    if (paginationOptions) {
      const HouseInformation = await houseInformationQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        HouseInformationPayload: HouseInformation.all(),
        paginationMeta: HouseInformation.getMeta(),
      }
    }

    const houseInformation = await houseInformationQuery

    return {
      HouseInformationPayload: houseInformation,
    }
  }
}
