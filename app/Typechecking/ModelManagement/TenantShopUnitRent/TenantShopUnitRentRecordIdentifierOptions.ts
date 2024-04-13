type TenantShopUnitRentRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id'
      identifier: number
    }

export default TenantShopUnitRentRecordIdentifierOptions
