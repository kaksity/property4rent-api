import LandlordTeamMember from 'App/Models/LandlordTeamMember'
import LandlordTeamMemberRecordIdentifierOptions from 'App/Typechecking/ModelManagement/LandlordTeamMember/LandlordTeamMemberRecordIdentifierOptions'
import CreateLandlordTeamMemberRecordOptions from 'App/Typechecking/ModelManagement/LandlordTeamMember/CreateLandlordTeamMemberRecordOptions'
import DeleteLandlordTeamMemberRecordOptions from 'App/Typechecking/ModelManagement/LandlordTeamMember/DeleteLandlordTeamMemberRecordOptions'
import ListLandlordTeamMemberRecordOptions from 'App/Typechecking/ModelManagement/LandlordTeamMember/ListLandlordTeamMemberRecordOptions'
import UpdateLandlordTeamMemberRecordOptions from 'App/Typechecking/ModelManagement/LandlordTeamMember/UpdateLandlordTeamMemberRecordOptions'

export default class LandlordTeamMemberActions {
  public static async createLandlordTeamMemberRecord(
    createLandlordTeamMemberRecordOptions: CreateLandlordTeamMemberRecordOptions
  ): Promise<LandlordTeamMember> {
    const { createPayload, dbTransactionOptions } = createLandlordTeamMemberRecordOptions

    const landlordTeamMember = new LandlordTeamMember()

    Object.assign(landlordTeamMember, createPayload)

    if (dbTransactionOptions.useTransaction) {
      landlordTeamMember.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlordTeamMember.save()

    return landlordTeamMember
  }

  public static async getLandlordTeamMemberById(id: number): Promise<LandlordTeamMember | null> {
    return LandlordTeamMember.query().where('id', id).first()
  }

  public static async getLandlordTeamMemberByIdentifier(
    identifier: string
  ): Promise<LandlordTeamMember | null> {
    return LandlordTeamMember.query().where('identifier', identifier).first()
  }

  public static async getLandlordTeamMemberByEmailAddress(
    emailAddress: string
  ): Promise<LandlordTeamMember | null> {
    return LandlordTeamMember.query().where('email', emailAddress).first()
  }

  public static async getLandlordTeamMemberRecord(
    LandlordTeamMemberRecordIdentifierOptions: LandlordTeamMemberRecordIdentifierOptions
  ): Promise<LandlordTeamMember | null> {
    const { identifierType, identifier } = LandlordTeamMemberRecordIdentifierOptions

    const GetLandlordTeamMemberRecord: Record<string, Function> = {
      id: async () => await this.getLandlordTeamMemberById(Number(identifier)),
      identifier: async () => await this.getLandlordTeamMemberByIdentifier(String(identifier)),
      email: async () => await this.getLandlordTeamMemberByEmailAddress(String(identifier)),
    }

    return GetLandlordTeamMemberRecord[identifierType]()
  }

  public static async updateLandlordTeamMemberRecord(
    updateLandlordTeamMemberRecordOptions: UpdateLandlordTeamMemberRecordOptions
  ): Promise<LandlordTeamMember | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateLandlordTeamMemberRecordOptions

    const landlordTeamMember = await this.getLandlordTeamMemberRecord(identifierOptions)

    if (landlordTeamMember === null) {
      return null
    }

    Object.assign(landlordTeamMember, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      landlordTeamMember.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlordTeamMember.save()

    return landlordTeamMember
  }

  public static async deleteLandlordTeamMemberRecord(
    deleteLandlordTeamMemberRecordOptions: DeleteLandlordTeamMemberRecordOptions
  ) {
    const { identifierOptions, dbTransactionOptions } = deleteLandlordTeamMemberRecordOptions

    const landlordTeamMember = await this.getLandlordTeamMemberRecord(identifierOptions)

    if (landlordTeamMember === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      landlordTeamMember.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await landlordTeamMember.softDelete()
  }

  public static async listLandlordTeamMembers(
    listLandlordTeamMemberRecordOptions: ListLandlordTeamMemberRecordOptions
  ): Promise<{ landlordTeamMemberPayload: LandlordTeamMember[]; paginationMeta?: any }> {
    const { filterRecordOptions, paginationOptions } = listLandlordTeamMemberRecordOptions
    const landlordTeamMemberQuery = LandlordTeamMember.query().orderBy('created_at', 'asc')

    if (typeof filterRecordOptions?.hasActivatedAccount === 'boolean') {
      landlordTeamMemberQuery.where(
        'has_activated_account',
        filterRecordOptions.hasActivatedAccount
      )
    }

    if (paginationOptions) {
      const landlordTeamMembers = await landlordTeamMemberQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        landlordTeamMemberPayload: landlordTeamMembers.all(),
        paginationMeta: landlordTeamMembers.getMeta(),
      }
    }

    const landlordTeamMembers = await landlordTeamMemberQuery
    return {
      landlordTeamMemberPayload: landlordTeamMembers,
    }
  }
}
