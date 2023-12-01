type ShopInformationRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id' | 'shopId'
      identifier: number
    }

export default ShopInformationRecordIdentifierOptions
