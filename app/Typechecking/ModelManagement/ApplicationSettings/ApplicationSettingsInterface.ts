import { DateTime } from 'luxon'

interface ApplicationSettingsInterface {
    id: number

    identifier: string

    initialLandlordWalletBalance: number

    createdAt: DateTime

    updatedAt: DateTime

    deletedAt: DateTime
}

export default ApplicationSettingsInterface