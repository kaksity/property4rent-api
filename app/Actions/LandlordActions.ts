import Landlord from 'App/Models/Landlord'
import LandlordRecordIdentifierOptions from 'App/Typechecking/ModelManagement/Landlord/LandlordRecordIdentifierOptions'
import CreateLandlordRecordOptions from 'App/Typechecking/ModelManagement/Landlord/CreateLandlordRecordOptions'
import DeleteLandlordRecordOptions from 'App/Typechecking/ModelManagement/Landlord/DeleteLandlordRecordOptions'
import ListLandlordRecordOptions from 'App/Typechecking/ModelManagement/Landlord/ListLandlordRecordOptions'
import UpdateLandlordRecordOptions from 'App/Typechecking/ModelManagement/Landlord/UpdateLandlordRecordOptions'

export default class LandlordActions {
  public static async createLandlordRecord(
    createLandlordRecordOptions: CreateLandlordRecordOptions
  ): Promise<Landlord> {
    const { createPayload, dbTransactionOptions } = createLandlordRecordOptions

    const landlord = new Landlord()

    Object.assign(landlord, createPayload)

    if (dbTransactionOptions.useTransaction) {
      landlord.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlord.save()

    return landlord
  }

  public static async getLandlordById(id: number): Promise<Landlord | null> {
    return Landlord.query().where('id', id).first()
  }

  public static async getLandlordByIdentifier(identifier: string): Promise<Landlord | null> {
    return Landlord.query().where('identifier', identifier).first()
  }

  public static async getLandlordRecord(
    LandlordRecordIdentifierOptions: LandlordRecordIdentifierOptions
  ): Promise<Landlord | null> {
    const { identifierType, identifier } = LandlordRecordIdentifierOptions

    const GetLandlordRecord: Record<string, Function> = {
      id: async () => await this.getLandlordById(Number(identifier)),
      identifier: async () => await this.getLandlordByIdentifier(String(identifier)),
    }

    return GetLandlordRecord[identifierType]()
  }

  public static async updateLandlordRecord(
    updateLandlordRecordOptions: UpdateLandlordRecordOptions
  ): Promise<Landlord | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } = updateLandlordRecordOptions

    const landlord = await this.getLandlordRecord(identifierOptions)

    if (landlord === null) {
      return null
    }

    Object.assign(landlord, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      landlord.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlord.save()

    return landlord
  }

  public static async deleteLandlordRecord(
    deleteLandlordRecordOptions: DeleteLandlordRecordOptions
  ) {
    const { identifierOptions, dbTransactionOptions } = deleteLandlordRecordOptions

    const landlord = await this.getLandlordRecord(identifierOptions)

    if (landlord === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      landlord.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlord.softDelete()
  }

  public static async listLandlords(
    listLandlordRecordOptions: ListLandlordRecordOptions
  ): Promise<{ landlordPayload: Landlord[]; paginationMeta?: any }> {
    const { paginationOptions } = listLandlordRecordOptions
    const landlordQuery = Landlord.query().orderBy('created_at', 'asc')

    if (paginationOptions) {
      const landlords = await landlordQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        landlordPayload: landlords.all(),
        paginationMeta: landlords.getMeta(),
      }
    }

    const landlords = await landlordQuery
    return {
      landlordPayload: landlords,
    }
  }
}
