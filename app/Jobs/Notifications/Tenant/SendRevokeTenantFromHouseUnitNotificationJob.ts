import { JobContract } from '@ioc:Rocketseat/Bull'
import TenantHouseUnitRentRevocationActions from 'App/Actions/TenantHouseUnitRentRevocationActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import {
  NULL_OBJECT,
  REVOKE_TENANT_FROM_HOUSE_UNIT_EMAIL_SUBJECT,
  REVOKE_TENANT_FROM_HOUSE_UNIT_EMAIL_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_REVOKE_TENANT_FROM_HOUSE_UNIT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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

export default class SendRevokeTenantFromHouseUnitNotificationJob implements JobContract {
  public key = SEND_REVOKE_TENANT_FROM_HOUSE_UNIT_NOTIFICATION_JOB

  public async handle(job) {
    const { tenantId, houseUnitId, landlordId } = job.data

    const tenantHouseUnitRentRevocation =
      await TenantHouseUnitRentRevocationActions.getTenantHouseUnitRentRevocationDistinct({
        landlordId,
        houseUnitId,
        tenantId,
      })

    if (tenantHouseUnitRentRevocation === NULL_OBJECT) {
      throw new JobQueueException('Tenant House Unit rent information does not exists')
    }

    await MailClient.send({
      sender: {
        email: businessConfig.defaultEmailAddress,
        name: businessConfig.defaultEmailName,
      },
      recipient: {
        email: tenantHouseUnitRentRevocation.tenant.email,
        name: tenantHouseUnitRentRevocation.tenant.firstName,
      },
      dataPayload: {
        recipientName: tenantHouseUnitRentRevocation.tenant.firstName,
        landlordName: `${tenantHouseUnitRentRevocation.landlord.firstName} ${tenantHouseUnitRentRevocation.landlord.lastName}`,
        revocationReason: tenantHouseUnitRentRevocation.reason,
      },
      subject: REVOKE_TENANT_FROM_HOUSE_UNIT_EMAIL_SUBJECT,
      template: REVOKE_TENANT_FROM_HOUSE_UNIT_EMAIL_EMAIL_TEMPLATE,
    })
  }
}
