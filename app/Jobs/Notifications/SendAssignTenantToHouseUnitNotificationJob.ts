import { JobContract } from '@ioc:Rocketseat/Bull'
import { SEND_ASSIGN_TENANT_TO_HOUSE_UNIT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'

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

export default class SendAssignTenantToHouseUnitNotificationJob implements JobContract {
  public key = SEND_ASSIGN_TENANT_TO_HOUSE_UNIT_NOTIFICATION_JOB

  public async handle(job) {
    const { tenantId, houseUnitId } = job.data
    //Send the email notification
  }
}
