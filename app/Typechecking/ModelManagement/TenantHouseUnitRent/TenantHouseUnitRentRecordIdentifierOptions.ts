type TenantHouseUnitRentRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id'
      identifier: number
    }

export default TenantHouseUnitRentRecordIdentifierOptions
