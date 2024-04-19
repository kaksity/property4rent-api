import { NULL_OBJECT } from 'App/Helpers/Messages/SystemMessage'
import HttpClient from 'App/InfrastructureProviders/Internals/HttpClient'
import CreateVirtualAccountNumberOptionsType from 'App/InfrastructureProviders/Typecheckings/Externals/VirtualAccountNumberProvider/CreateVirtualAccountNumberOptionsType'
import CreateVirtualAccountNumberResponseOptionsType from 'App/InfrastructureProviders/Typecheckings/Externals/VirtualAccountNumberProvider/CreateVirtualAccountNumberResponseOptionsType'
import VirtualAccountNumberProviderInterface from 'App/InfrastructureProviders/Typecheckings/Externals/VirtualAccountNumberProvider/VirtualAccountNumberProviderInterface'
import virtualAccountNumberConfig from 'Config/virtualAccountNumberConfig'

export default class ProvidusVirtualAccountNumberProviderDriver
  implements VirtualAccountNumberProviderInterface
{
  /**
 * @description Method to generate virtual account number
 * @author DP
 * @param {CreateVirtualAccountNumberOptionsType} createVirtualAccountNumberOptionsType
 * @return {*}  {Promise<CreateVirtualAccountNumberResponseOptionsType>}
 * @memberof ProvidusVirtualAccountNumberProviderDriver
 */
async generateVirtualAccountNumber(
    createVirtualAccountNumberOptionsType: CreateVirtualAccountNumberOptionsType
  ): Promise<CreateVirtualAccountNumberResponseOptionsType> {
    const { accountName } = createVirtualAccountNumberOptionsType
    try {
        const httpClientResponse = await HttpClient.post({
            endpointUrl: virtualAccountNumberConfig.providus.endpoint,
            headerOptions: {
              headers: {
                'X-Auth-Signature': virtualAccountNumberConfig.providus.xAuthSignature,
                'Client-Id': virtualAccountNumberConfig.providus.clientId,
              },
            },
            dataPayload: {
              account_name: accountName,
            },
          })

          if (!httpClientResponse.apiResponse.requestSuccessful) {
            console.log(
              '🚀 ~ ProvidusVirtualAccountNumberProviderDriver.generateVirtualAccountNumber generateVirtualAccountNumberError ->',
              httpClientResponse
            )

            return {
              virtualAccountInformation: NULL_OBJECT,
              infrastructureResults: NULL_OBJECT,
            }
          }

          const providerResponse = {
            ...httpClientResponse.apiResponse,
            bankName: 'Providus Bank',
          }

          return {
            virtualAccountInformation: {
              accountNumber: providerResponse.account_number,
              accountName: providerResponse.account_name,
              transactionRef: providerResponse.initiationTranRef,
              bankName: providerResponse.bankName,
            },
            infrastructureResults: providerResponse,
          }
    } catch (generateVirtualAccountNumberError) {
        console.log(
            '🚀 ~ ProvidusVirtualAccountNumberProviderDriver.generateVirtualAccountNumber generateVirtualAccountNumberError ->',
            generateVirtualAccountNumberError
          )
        return {
            virtualAccountInformation: NULL_OBJECT,
            infrastructureResults: NULL_OBJECT,
          }
    }
  }
}
