import { JobContract } from '@ioc:Rocketseat/Bull'
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

  public async handle() {
    // public async handle(job) {
    // const { landlordId } = job.data
    //Send the email notification
  }
}
