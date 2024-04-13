import { JobContract } from '@ioc:Rocketseat/Bull'
import TenantShopUnitRentRevocationActions from 'App/Actions/TenantShopUnitRentRevocationActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import {
  NULL_OBJECT,
  REVOKE_TENANT_FROM_SHOP_UNIT_EMAIL_SUBJECT,
  REVOKE_TENANT_FROM_SHOP_UNIT_EMAIL_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_REVOKE_TENANT_FROM_SHOP_UNIT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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

export default class SendRevokeTenantFromShopUnitNotificationJob implements JobContract {
  public key = SEND_REVOKE_TENANT_FROM_SHOP_UNIT_NOTIFICATION_JOB

  public async handle(job) {
    const { tenantId, shopUnitId, landlordId } = job.data

    const tenantShopUnitRentRevocation =
      await TenantShopUnitRentRevocationActions.getTenantShopUnitRentRevocationDistinct({
        landlordId,
        shopUnitId,
        tenantId,
      })

    if (tenantShopUnitRentRevocation === NULL_OBJECT) {
      throw new JobQueueException('Tenant shop unit rent information does not exists')
    }

    await MailClient.send({
      sender: {
        email: businessConfig.defaultEmailAddress,
        name: businessConfig.defaultEmailName,
      },
      recipient: {
        email: tenantShopUnitRentRevocation.tenant.email,
        name: tenantShopUnitRentRevocation.tenant.firstName,
      },
      dataPayload: {
        recipientName: tenantShopUnitRentRevocation.tenant.firstName,
        landlordName: `${tenantShopUnitRentRevocation.landlord.firstName} ${tenantShopUnitRentRevocation.landlord.lastName}`,
        revocationReason: tenantShopUnitRentRevocation.reason,
      },
      subject: REVOKE_TENANT_FROM_SHOP_UNIT_EMAIL_SUBJECT,
      template: REVOKE_TENANT_FROM_SHOP_UNIT_EMAIL_EMAIL_TEMPLATE,
    })
  }
}
