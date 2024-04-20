type TenantWalletRecordIdentifierOptions =
  | {
      identifierType: 'identifier'
      identifier: string
    }
  | {
      identifierType: 'id' | 'tenantId'
      identifier: number
    }

export default TenantWalletRecordIdentifierOptions
