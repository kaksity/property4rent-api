import { SERVICE_PROVIDER_DOES_NOT_EXIST } from 'App/Helpers/Messages/SystemMessage'
import ProvidusVirtualAccountNumberProviderDriver from 'App/InfrastructureProviders/Externals/VirtualAccountNumberProvider/ProvidusVirtualAccountNumberProviderDriver'

export default class VirtualAccountNumberProviderFactory {
    private currentProviderIdentifier: string

    constructor(providerIdentifier: string) {
        this.currentProviderIdentifier = providerIdentifier
    }

    public build(): ProvidusVirtualAccountNumberProviderDriver | string {

        if (this.currentProviderIdentifier === 'providus') {
            return new ProvidusVirtualAccountNumberProviderDriver()
        }

        return SERVICE_PROVIDER_DOES_NOT_EXIST
    }
}