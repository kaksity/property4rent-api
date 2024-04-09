type ShopUnitRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id'
      identifier: number
    }

export default ShopUnitRecordIdentifierOptions
