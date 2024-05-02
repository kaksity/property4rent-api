import { JobContract } from '@ioc:Rocketseat/Bull'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import { NULL_OBJECT } from 'App/Helpers/Messages/SystemMessage'
import { SEND_COMPLETE_LANDLORD_ACCOUNT_ACTIVATION_REMINDER_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'

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

export default class SendCompleteLandlordAccountActivationNotificationJob implements JobContract {
  public key = SEND_COMPLETE_LANDLORD_ACCOUNT_ACTIVATION_REMINDER_NOTIFICATION_JOB

    public async handle(job) {
    const { landlordTeamMemberId } = job.data

    const landlordTeamMember = await LandlordTeamMemberActions.getLandlordTeamMemberRecord({
      identifierType: 'id',
      identifier: landlordTeamMemberId
    })

    if (landlordTeamMember === NULL_OBJECT) {
      throw new JobQueueException(`Landlord Team Member ${landlordTeamMemberId} does not exists`)
    }


  }
}
