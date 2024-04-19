import Env from '@ioc:Adonis/Core/Env'
const virtualAccountNumberConfig = {
  currentVirtualAccountNumber: Env.get('CURRENT_VIRTUAL_ACCOUNT_NUMBER_PROVIDER'),

  providus: {
    identifier: 'providus',
    endpoint: Env.get('PROVIDUS_VIRTUAL_ACCOUNT_NUMBER_PROVIDER_ENDPOINT'),
    xAuthSignature: Env.get('PROVIDUS_VIRTUAL_ACCOUNT_NUMBER_PROVIDER_X_AUTH_SIGNATURE'),
    clientId: Env.get('PROVIDUS_VIRTUAL_ACCOUNT_NUMBER_PROVIDER_CLIENT_ID'),
  },
}

export default virtualAccountNumberConfig
