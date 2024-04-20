interface TenantWalletInterface {
  tenantId: number

  walletAccountNumber: string

  walletPin: string

  walletBalance: number

  totalInflow: number

  totalOutflow: number

  providerAccountNumber: string | null

  providerAccountName: string | null

  providerBankName: string | null
}

export default TenantWalletInterface
