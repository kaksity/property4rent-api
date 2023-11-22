import OtpToken from 'App/Models/OtpToken'
import OtpTokenRecordIdentifierOptions from 'App/Typechecking/ModelManagement/OtpToken/OtpTokenRecordIdentifierOptions'
import CreateOtpTokenRecordOptions from 'App/Typechecking/ModelManagement/OtpToken/CreateOtpTokenRecordOptions'
import DeleteOtpTokenRecordOptions from 'App/Typechecking/ModelManagement/OtpToken/DeleteOtpTokenRecordOptions'
import UpdateOtpTokenRecordOptions from 'App/Typechecking/ModelManagement/OtpToken/UpdateOtpTokenRecordOptions'
import businessConfig from 'Config/businessConfig'

export default class OtpTokenActions {
  public static async createOtpTokenRecord(
    createOtpTokenRecordOptions: CreateOtpTokenRecordOptions
  ): Promise<OtpToken> {
    const { createPayload, dbTransactionOptions } = createOtpTokenRecordOptions

    const otpToken = new OtpToken()

    Object.assign(otpToken, createPayload)

    if (dbTransactionOptions.useTransaction) {
      otpToken.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await otpToken.save()

    return otpToken
  }

  public static async getOtpTokenById(id: number): Promise<OtpToken | null> {
    return OtpToken.query().where('id', id).first()
  }

  public static async getOtpTokenByIdentifier(identifier: string): Promise<OtpToken | null> {
    return OtpToken.query().where('identifier', identifier).first()
  }

  public static async getOtpTokenByToken(token: string): Promise<OtpToken | null> {
    return OtpToken.query().where('token', token).first()
  }

  public static async getOtpTokenByAuthorId(authorId: number): Promise<OtpToken | null> {
    return OtpToken.query().where('author_id', authorId).first()
  }

  public static async getOtpTokenRecord(
    OtpTokenRecordIdentifierOptions: OtpTokenRecordIdentifierOptions
  ): Promise<OtpToken | null> {
    const { identifierType, identifier } = OtpTokenRecordIdentifierOptions

    const GetOtpTokenRecord: Record<string, Function> = {
      id: async () => await this.getOtpTokenById(Number(identifier)),
      identifier: async () => await this.getOtpTokenByIdentifier(String(identifier)),
      author: async () => await this.getOtpTokenByAuthorId(Number(identifier)),
      token: async () => await this.getOtpTokenByToken(String(identifier)),
    }

    return GetOtpTokenRecord[identifierType]()
  }

  public static async updateOtpTokenRecord(
    updateOtpTokenRecordOptions: UpdateOtpTokenRecordOptions
  ): Promise<OtpToken | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } = updateOtpTokenRecordOptions

    const otpToken = await this.getOtpTokenRecord(identifierOptions)

    if (otpToken === null) {
      return null
    }

    Object.assign(otpToken, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      otpToken.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await otpToken.save()

    return otpToken
  }

  public static async deleteOtpTokenRecord(
    deleteOtpTokenRecordOptions: DeleteOtpTokenRecordOptions
  ) {
    const { identifierOptions, dbTransactionOptions } = deleteOtpTokenRecordOptions

    const otpToken = await this.getOtpTokenRecord(identifierOptions)

    if (otpToken === null) {
      return null
    }

    if (dbTransactionOptions.useTransaction) {
      otpToken.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await otpToken.softDelete()
  }

  public static async revokeOtpToken(authorId: number) {
    await OtpToken.query().where('author_id', authorId).delete()
  }
}
