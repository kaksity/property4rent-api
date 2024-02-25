import HouseUnit from 'App/Models/HouseUnit'
import HouseUnitRecordIdentifierOptions from 'App/Typechecking/ModelManagement/HouseUnit/HouseUnitRecordIdentifierOptions'
import CreateHouseUnitRecordOptions from 'App/Typechecking/ModelManagement/HouseUnit/CreateHouseUnitRecordOptions'
import DeleteHouseUnitRecordOptions from 'App/Typechecking/ModelManagement/HouseUnit/DeleteHouseUnitRecordOptions'
import ListHouseUnitRecordOptions from 'App/Typechecking/ModelManagement/HouseUnit/ListHouseUnitRecordOptions'
import UpdateHouseUnitRecordOptions from 'App/Typechecking/ModelManagement/HouseUnit/UpdateHouseUnitRecordOptions'

export default class HouseUnitActions {
  /**
   * @description Method to create a house unit record
   * @author DP
   * @static
   * @param {CreateHouseUnitRecordOptions} createHouseUnitRecordOptions
   * @return {*}  {Promise<HouseUnit>}
   * @memberof HouseUnitActions
   */
  public static async createHouseUnitRecord(
    createHouseUnitRecordOptions: CreateHouseUnitRecordOptions
  ): Promise<HouseUnit> {
    const { createPayload, dbTransactionOptions } = createHouseUnitRecordOptions

    const houseUnit = new HouseUnit()

    Object.assign(houseUnit, createPayload)

    if (dbTransactionOptions.useTransaction) {
      houseUnit.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await houseUnit.save()

    return houseUnit
  }

  /**
   * @description Method to get house unit by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<HouseUnit | null>)}
   * @memberof HouseUnitActions
   */
  public static async getHouseUnitById(id: number): Promise<HouseUnit | null> {
    return HouseUnit.query().where('id', id).first()
  }

  /**
   * @description Method to get house unit by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<HouseUnit | null>)}
   * @memberof HouseUnitActions
   */
  public static async getHouseUnitByIdentifier(identifier: string): Promise<HouseUnit | null> {
    return HouseUnit.query().where('identifier', identifier).first()
  }

  /**
   * @description Method to get house unit record
   * @author DP
   * @static
   * @param {HouseUnitRecordIdentifierOptions} HouseUnitRecordIdentifierOptions
   * @return {*}  {(Promise<HouseUnit | null>)}
   * @memberof HouseUnitActions
   */
  public static async getHouseUnitRecord(
    HouseUnitRecordIdentifierOptions: HouseUnitRecordIdentifierOptions
  ): Promise<HouseUnit | null> {
    const { identifierType, identifier } = HouseUnitRecordIdentifierOptions

    const GetHouseUnitRecord: Record<string, Function> = {
      id: async () => await this.getHouseUnitById(Number(identifier)),
      identifier: async () => await this.getHouseUnitByIdentifier(String(identifier)),
    }

    return GetHouseUnitRecord[identifierType]()
  }

  /**
   * @description Method to update house Unit
   * @author DP
   * @static
   * @param {UpdateHouseUnitRecordOptions} updateHouseUnitRecordOptions
   * @return {*}  {(Promise<HouseUnit | null>)}
   * @memberof HouseUnitActions
   */
  public static async updateHouseUnitRecord(
    updateHouseUnitRecordOptions: UpdateHouseUnitRecordOptions
  ): Promise<HouseUnit | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } = updateHouseUnitRecordOptions

    const houseUnit = await this.getHouseUnitRecord(identifierOptions)

    if (houseUnit === null) {
      return null
    }

    Object.assign(houseUnit, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      houseUnit.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await houseUnit.save()

    return houseUnit
  }

  /**
   * @description Method to delete house Unit
   * @author DP
   * @static
   * @param {DeleteHouseUnitRecordOptions} deleteHouseUnitRecordOptions
   * @return {*}  {Promise<void>}
   * @memberof HouseUnitActions
   */
  public static async deleteHouseUnitRecord(
    deleteHouseUnitRecordOptions: DeleteHouseUnitRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteHouseUnitRecordOptions

    const houseUnit = await this.getHouseUnitRecord(identifierOptions)

    if (houseUnit === null) return

    if (dbTransactionOptions.useTransaction) {
      houseUnit.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await houseUnit.softDelete()
  }

  /**
   * @description Method to list house Unit
   * @author DP
   * @static
   * @param {ListHouseUnitRecordOptions} listHouseUnitRecordOptions
   * @return {*}  {Promise<{ houseUnitPayload: HouseUnit[]; paginationMeta?: any }>}
   * @memberof HouseUnitActions
   */
  public static async listHouseUnits(
    listHouseUnitRecordOptions: ListHouseUnitRecordOptions
  ): Promise<{ houseUnitPayload: HouseUnit[]; paginationMeta?: any }> {
    const { paginationOptions, filterRecordOptions } = listHouseUnitRecordOptions
    const houseUnitQuery = HouseUnit.query().orderBy('created_at', 'asc')

    if (filterRecordOptions?.houseId) {
      houseUnitQuery.where('house_id', filterRecordOptions.houseId)
    }

    if (paginationOptions) {
      const HouseUnit = await houseUnitQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        houseUnitPayload: HouseUnit.all(),
        paginationMeta: HouseUnit.getMeta(),
      }
    }

    const houseUnit = await houseUnitQuery

    return {
      houseUnitPayload: houseUnit,
    }
  }
}
