import LandlordActions from 'App/Actions/LandlordActions'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import { SEND_COMPLETE_LANDLORD_ACCOUNT_ACTIVATION_REMINDER_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'

export default async function enqueueCompleteLandlordAccountActivationReminder() {
  const { landlordPayload: landlords } = await LandlordActions.listLandlords({
    filterRecordOptions: {
      hasActivatedAccount: false,
    },
  })

  landlords.forEach(async (landlord) => {
    await QueueClient.addJobToQueue({
      jobIdentifier: SEND_COMPLETE_LANDLORD_ACCOUNT_ACTIVATION_REMINDER_NOTIFICATION_JOB,
      jobPayload: {
        landlordId: landlord.id,
      },
    })
  })
}
