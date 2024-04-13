type TenantShopUnitRentRevocationRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id'
      identifier: number
    }

export default TenantShopUnitRentRevocationRecordIdentifierOptions
