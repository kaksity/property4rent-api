import { JobContract } from '@ioc:Rocketseat/Bull'
import ApplicationSettingsAction from 'App/Actions/ApplicationSettingsActions'
import LandlordActions from 'App/Actions/LandlordActions'
import LandlordWalletActions from 'App/Actions/LandlordWalletActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import { NULL_OBJECT, SERVICE_PROVIDER_DOES_NOT_EXIST } from 'App/Helpers/Messages/SystemMessage'
import VirtualAccountNumberProviderFactory from 'App/InfrastructureProviders/Factories/VirtualAccountNumberProviderFactory'
import VirtualAccountNumberProviderInterface from 'App/InfrastructureProviders/Typecheckings/Externals/VirtualAccountNumberProvider/VirtualAccountNumberProviderInterface'
import { COMPLETE_LANDLORD_WALLET_SETUP_JOB } from 'App/Typechecking/JobManagement/FinanceJobTypes'
import virtualAccountNumberConfig from 'Config/virtualAccountNumberConfig'

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

export default class CompleteLandlordWalletSetupJob implements JobContract {
  public key = COMPLETE_LANDLORD_WALLET_SETUP_JOB

  public async handle(job) {
    const { landlordId } = job.data

    const landlord = await LandlordActions.getLandlordRecord({
      identifierType: 'id',
      identifier: landlordId,
    })

    if (landlord === NULL_OBJECT) {
      throw new JobQueueException(`Landlord with id ${landlordId} does not exists`)
    }

    const landlordWallet = await LandlordWalletActions.getLandlordWalletRecord({
      identifierType: 'landlordId',
      identifier: landlord.id,
    })

    if (landlordWallet !== NULL_OBJECT) {
      throw new JobQueueException('Landlord wallet account was already setup')
    }

    const applicationSettings = await ApplicationSettingsAction.getApplicationSettings()

    const virtualAccountNumberProvider = new VirtualAccountNumberProviderFactory(
      virtualAccountNumberConfig.currentVirtualAccountNumber
    ).build()

    if (virtualAccountNumberProvider === SERVICE_PROVIDER_DOES_NOT_EXIST) {
      throw new JobQueueException(
        'Could not complete landlord wallet setup. Unable to initialize provider'
      )
    }

    const { virtualAccountInformation } = await (
      virtualAccountNumberProvider as VirtualAccountNumberProviderInterface
    ).generateVirtualAccountNumber({
      accountName: landlord.name,
    })

    if (virtualAccountInformation === NULL_OBJECT) {
      throw new JobQueueException(
        'Could not complete landlord wallet setup. Unable to create virtual account number'
      )
    }

    await LandlordWalletActions.createLandlordWalletRecord({
      createPayload: {
        landlordId: landlord.id,
        walletAccountNumber: LandlordWalletActions.generateLandlordWalletAccountNumber(),
        walletBalance: applicationSettings.initialLandlordWalletBalance,
        totalInflow: applicationSettings.initialLandlordWalletBalance,
        totalOutflow: 0,
        providerAccountName: virtualAccountInformation.accountName,
        providerAccountNumber: virtualAccountInformation.accountNumber,
        providerBankName: virtualAccountInformation.bankName,
      },
      dbTransactionOptions: {
        useTransaction: false,
      },
    })
  }
}
