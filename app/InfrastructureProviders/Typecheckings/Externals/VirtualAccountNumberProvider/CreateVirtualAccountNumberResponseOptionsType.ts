type CreateVirtualAccountNumberResponseOptionsType = {
  virtualAccountInformation: {
    accountNumber: string

    accountName: string

    transactionRef: string

    bankName: string
  } | null
  infrastructureResults: any
}

export default CreateVirtualAccountNumberResponseOptionsType
