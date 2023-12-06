type HouseRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id'
      identifier: number
    }

export default HouseRecordIdentifierOptions
