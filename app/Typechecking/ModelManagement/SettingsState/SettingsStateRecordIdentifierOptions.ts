type SettingsStateRecordIdentifierOptions =
  | {
      identifierType: 'id'
      identifier: number
    }
  | {
      identifierType: 'identifier'
      identifier: string
    }

export default SettingsStateRecordIdentifierOptions
