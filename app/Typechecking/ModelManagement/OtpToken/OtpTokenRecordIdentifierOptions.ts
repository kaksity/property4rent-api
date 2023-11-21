type OtpTokenRecordIdentifierOptions =
  | {
      identifierType: 'identifier' | 'token'
      identifier: string
    }
  | {
      identifierType: 'id' | 'author'
      identifier: number
    }

export default OtpTokenRecordIdentifierOptions
