type TenantHouseRentRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id'
      identifier: number
    }

export default TenantHouseRentRecordIdentifierOptions
