type LandlordWalletRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id' | 'landlordId'
      identifier: number
    }

export default LandlordWalletRecordIdentifierOptions
