type SettingsLgaRecordIdentifierOptions =
  | {
      identifierType: 'identifier' | 'email'
      identifier: string
    }
  | {
      identifierType: 'id'
      identifier: number
    }

export default SettingsLgaRecordIdentifierOptions
