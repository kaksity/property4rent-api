import { JobContract } from '@ioc:Rocketseat/Bull'
import LandlordActions from 'App/Actions/LandlordActions'
import OtpTokenActions from 'App/Actions/OtpTokenActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import {
  NULL_OBJECT,
  SEND_LANDLORD_ACCOUNT_PASSWORD_RESET_EMAIL_SUBJECT,
  SEND_LANDLORD_ACCOUNT_PASSWORD_RESET_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_LANDLORD_ACCOUNT_PASSWORD_RESET_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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

export default class SendLandlordAccountActivationNotificationJob implements JobContract {
  public key = SEND_LANDLORD_ACCOUNT_PASSWORD_RESET_NOTIFICATION_JOB

  public async handle(job) {
    const { landlordId } = job.data

    const landlord = await LandlordActions.getLandlordRecord({
      identifierType: 'id',
      identifier: landlordId,
    })

    if (landlord === NULL_OBJECT) {
      throw new JobQueueException(`Landlord with id ${landlordId} does not exists`)
    }

    const otpToken = await OtpTokenActions.getOtpTokenRecord({
      identifierType: 'author',
      identifier: landlord.id,
    })

    if (otpToken === NULL_OBJECT || otpToken.purpose !== 'reset-password') {
      throw new JobQueueException('Otp token was not created')
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
        otpToken: otpToken.token,
        expirationDateTime: otpToken.expiresAt.toFormat(businessConfig.defaultDateTimeFormat),
      },
      subject: SEND_LANDLORD_ACCOUNT_PASSWORD_RESET_EMAIL_SUBJECT,
      template: SEND_LANDLORD_ACCOUNT_PASSWORD_RESET_EMAIL_TEMPLATE,
    })
  }
}
