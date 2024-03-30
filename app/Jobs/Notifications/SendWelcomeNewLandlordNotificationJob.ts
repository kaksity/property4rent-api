import { JobContract } from '@ioc:Rocketseat/Bull'
import LandlordActions from 'App/Actions/LandlordActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import {
  NULL_OBJECT,
  SEND_WELCOME_NEW_LANDLORD_EMAIL_SUBJECT,
  SEND_WELCOME_NEW_LANDLORD_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_WELCOME_NEW_LANDLORD_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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

export default class SendWelcomeNewLandlordNotificationJob implements JobContract {
  public key = SEND_WELCOME_NEW_LANDLORD_NOTIFICATION_JOB

  public async handle(job) {
    const { landlordId } = job.data

    const landlord = await LandlordActions.getLandlordRecord({
      identifierType: 'id',
      identifier: landlordId,
    })

    if (landlord === NULL_OBJECT) {
      throw new JobQueueException(`Landlord with id ${landlordId} does not exists`)
    }

    await MailClient.send({
      sender: {
        email: businessConfig.defaultEmailAddress,
        name: businessConfig.defaultEmailName,
      },
      recipient: {
        email: landlord.email,
        name: landlord.firstName,
      },
      dataPayload: {
        recipientName: landlord.firstName,
      },
      subject: SEND_WELCOME_NEW_LANDLORD_EMAIL_SUBJECT,
      template: SEND_WELCOME_NEW_LANDLORD_EMAIL_TEMPLATE,
    })
  }
}
