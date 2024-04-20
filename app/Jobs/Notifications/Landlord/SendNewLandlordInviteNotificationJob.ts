import { JobContract } from '@ioc:Rocketseat/Bull'
import LandlordActions from 'App/Actions/LandlordActions'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import {
  NULL_OBJECT,
  SEND_NEW_LANDLORD_INVITE_EMAIL_SUBJECT,
  SEND_NEW_LANDLORD_INVITE_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_NEW_LANDLORD_INVITE_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
import businessConfig from 'Config/businessConfig'

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

export default class SendNewLandlordInviteNotificationJob implements JobContract {
  public key = SEND_NEW_LANDLORD_INVITE_NOTIFICATION_JOB

  public async handle(job) {
    const { landlordTeamMemberId, newPassword } = job.data

    const landlordTeamMember = await LandlordTeamMemberActions.getLandlordTeamMemberRecord({
      identifierType: 'id',
      identifier: landlordTeamMemberId,
    })

    if (landlordTeamMember === NULL_OBJECT) {
      throw new JobQueueException(
        `Landlord Team Member with id ${landlordTeamMemberId} does not exists`
      )
    }

    const landlord = await LandlordActions.getLandlordRecord({
      identifierType: 'id',
      identifier: landlordTeamMember.landlordId,
    })

    if (landlord === NULL_OBJECT) {
      throw new JobQueueException(`Landlord id ${landlordTeamMember.landlordId} does not exists`)
    }

    await MailClient.send({
      sender: {
        email: businessConfig.defaultEmailAddress,
        name: businessConfig.defaultEmailName,
      },
      recipient: {
        email: landlordTeamMember.email,
        name: landlordTeamMember.firstName,
      },
      dataPayload: {
        landlordName: landlord.name,
        landlordTeamMemberEmail: landlordTeamMember.email,
        landlordTeamMemberRole: landlordTeamMember.role,
        landlordTeamMemberPassword: newPassword,
      },
      subject: SEND_NEW_LANDLORD_INVITE_EMAIL_SUBJECT,
      template: SEND_NEW_LANDLORD_INVITE_EMAIL_TEMPLATE,
    })
  }
}
