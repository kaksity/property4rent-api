import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import { SEND_COMPLETE_LANDLORD_ACCOUNT_ACTIVATION_REMINDER_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
import Logger from '@ioc:Adonis/Core/Logger'
import businessConfig from 'Config/businessConfig'

export default async function enqueueCompleteLandlordAccountActivationReminder() {
  Logger.info(`Running Complete Landlord Account Activation at ${businessConfig.currentDateTime}`)

  const { landlordTeamMemberPayload: landlordTeamMembers } = await LandlordTeamMemberActions.listLandlordTeamMembers({
    filterRecordOptions: {
      hasActivatedAccount: false,
    },
  })

  landlordTeamMembers.forEach(async (landlordTeamMember) => {
    await QueueClient.addJobToQueue({
      jobIdentifier: SEND_COMPLETE_LANDLORD_ACCOUNT_ACTIVATION_REMINDER_NOTIFICATION_JOB,
      jobPayload: {
        landlordTeamMemberId: landlordTeamMember.id,
      },
    })
  })
}
