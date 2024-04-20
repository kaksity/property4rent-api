import { JobContract } from '@ioc:Rocketseat/Bull'
import ApplicationSettingsAction from 'App/Actions/ApplicationSettingsActions'
import TenantActions from 'App/Actions/TenantActions'
import TenantWalletActions from 'App/Actions/TenantWalletActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import { NULL_OBJECT } from 'App/Helpers/Messages/SystemMessage'
import { COMPLETE_TENANT_WALLET_SETUP_JOB } from 'App/Typechecking/JobManagement/FinanceJobTypes'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export default class CompleteTenantWalletSetupJob implements JobContract {
  public key = COMPLETE_TENANT_WALLET_SETUP_JOB

  public async handle(job) {
    const { tenantId } = job.data

    const tenant = await TenantActions.getTenantRecord({
      identifierType: 'id',
      identifier: tenantId,
    })

    if (tenant === NULL_OBJECT) {
      throw new JobQueueException(`Tenant with id ${tenantId} does not exists`)
    }

    const tenantWallet = await TenantWalletActions.getTenantWalletRecord({
      identifierType: 'tenantId',
      identifier: tenant.id,
    })

    if (tenantWallet !== NULL_OBJECT) {
      throw new JobQueueException('Tenant wallet account was already setup')
    }

    const applicationSettings = await ApplicationSettingsAction.getApplicationSettings()

    // const virtualAccountNumberProvider = new VirtualAccountNumberProviderFactory(
    //   virtualAccountNumberConfig.currentVirtualAccountNumber
    // ).build()

    // if (virtualAccountNumberProvider === SERVICE_PROVIDER_DOES_NOT_EXIST) {
    //   throw new JobQueueException(
    //     'Could not complete landlord wallet setup. Unable to initialize provider'
    //   )
    // }

    // const { virtualAccountInformation } = await (
    //   virtualAccountNumberProvider as VirtualAccountNumberProviderInterface
    // ).generateVirtualAccountNumber({
    //   accountName: landlord.name,
    // })

    // if (virtualAccountInformation === NULL_OBJECT) {
    //   throw new JobQueueException(
    //     'Could not complete landlord wallet setup. Unable to create virtual account number'
    //   )
    // }

    await TenantWalletActions.createTenantWalletRecord({
      createPayload: {
        tenantId: tenant.id,
        walletAccountNumber: TenantWalletActions.generateTenantWalletAccountNumber(),
        walletBalance: applicationSettings.initialTenantWalletBalance,
        totalInflow: applicationSettings.initialTenantWalletBalance,
        totalOutflow: 0,
        providerAccountName: null,
        providerAccountNumber: null,
        providerBankName: null,
        // providerAccountName: virtualAccountInformation.accountName,
        // providerAccountNumber: virtualAccountInformation.accountNumber,
        // providerBankName: virtualAccountInformation.bankName,
      },
      dbTransactionOptions: {
        useTransaction: false,
      },
    })
  }
}
