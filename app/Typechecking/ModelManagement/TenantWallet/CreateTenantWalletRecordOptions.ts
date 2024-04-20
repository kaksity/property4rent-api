import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import TenantWalletInterface from 'App/Typechecking/ModelManagement/TenantWallet/TenantWalletInterface'

type CreateTenantWalletPayloadOptions = Pick<
  TenantWalletInterface,
  | 'tenantId'
  | 'walletAccountNumber'
  | 'walletBalance'
  | 'totalInflow'
  | 'totalOutflow'
  | 'providerAccountName'
  | 'providerBankName'
  | 'providerAccountNumber'
>

type CreateTenantWalletRecordOptions = CreateNewRecordGeneric<CreateTenantWalletPayloadOptions>

export default CreateTenantWalletRecordOptions
