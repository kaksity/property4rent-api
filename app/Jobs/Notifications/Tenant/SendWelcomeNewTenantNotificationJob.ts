import { JobContract } from '@ioc:Rocketseat/Bull'
import TenantActions from 'App/Actions/TenantActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import {
  NULL_OBJECT,
  SEND_WELCOME_NEW_TENANT_EMAIL_SUBJECT,
  SEND_WELCOME_NEW_TENANT_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_WELCOME_NEW_TENANT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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

export default class SendWelcomeNewTenantNotificationJob implements JobContract {
  public key = SEND_WELCOME_NEW_TENANT_NOTIFICATION_JOB

  public async handle(job) {
    const { tenantId, password } = job.data
    //Send the email notification
    const tenant = await TenantActions.getTenantRecord({
      identifierType: 'id',
      identifier: tenantId,
    })

    if (tenant === NULL_OBJECT) {
      throw new JobQueueException(`Tenant with id ${tenantId} does not exists`)
    }

    await MailClient.send({
      sender: {
        email: businessConfig.defaultEmailAddress,
        name: businessConfig.defaultEmailName,
      },
      recipient: {
        email: tenant.email,
        name: tenant.firstName,
      },
      dataPayload: {
        recipientName: tenant.firstName,
        landlordName: `${tenant.createdByLandlord.firstName} ${tenant.createdByLandlord.lastName}`,
        tenantEmail: tenant.email,
        tenantPassword: password,
      },
      subject: SEND_WELCOME_NEW_TENANT_EMAIL_SUBJECT,
      template: SEND_WELCOME_NEW_TENANT_EMAIL_TEMPLATE,
    })
  }
}
