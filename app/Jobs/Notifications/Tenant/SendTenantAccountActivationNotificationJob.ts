import { JobContract } from '@ioc:Rocketseat/Bull'
import TenantActions from 'App/Actions/TenantActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import {
  NULL_OBJECT,
  SEND_TENANT_ACCOUNT_ACTIVATION_EMAIL_SUBJECT,
  SEND_TENANT_ACCOUNT_ACTIVATION_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_TENANT_ACCOUNT_ACTIVATION_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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

export default class SendTenantAccountActivationNotificationJob implements JobContract {
  public key = SEND_TENANT_ACCOUNT_ACTIVATION_NOTIFICATION_JOB

  public async handle(job) {
    const { tenantId } = job.data

    const tenant = await TenantActions.getTenantRecord({
      identifierType: 'id',
      identifier: tenantId,
    })

    if (tenant === NULL_OBJECT) {
      throw new JobQueueException(`Tenant with id ${tenantId} does not exists`)
    }

    const otpToken = await OtpTokenActions.getOtpTokenRecord({
      identifierType: 'author',
      identifier: tenant.id,
    })

    if (otpToken === NULL_OBJECT || otpToken.purpose !== 'account-activation') {
      throw new JobQueueException('Otp token was not created')
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
        otpToken: otpToken.token,
        expirationDateTime: otpToken.expiresAt.toFormat(businessConfig.defaultDateTimeFormat),
      },
      subject: SEND_TENANT_ACCOUNT_ACTIVATION_EMAIL_SUBJECT,
      template: SEND_TENANT_ACCOUNT_ACTIVATION_EMAIL_TEMPLATE,
    })
  }
}
