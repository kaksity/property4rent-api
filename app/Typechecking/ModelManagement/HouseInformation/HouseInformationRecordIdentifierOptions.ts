type HouseInformationRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id' | 'houseId'
      identifier: number
    }

export default HouseInformationRecordIdentifierOptions
