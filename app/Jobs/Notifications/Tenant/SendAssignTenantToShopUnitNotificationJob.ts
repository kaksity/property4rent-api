import { JobContract } from '@ioc:Rocketseat/Bull'
import TenantShopUnitRentActions from 'App/Actions/TenantShopUnitRentActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import changeAmountToNaira from 'App/Helpers/Functions/changeAmountToNaira'
import thousandSeparateTheAmount from 'App/Helpers/Functions/thousandSeparateTheAmount'
import {
  NULL_OBJECT,
  ASSIGN_TENANT_TO_SHOP_UNIT_EMAIL_SUBJECT,
  ASSIGN_TENANT_TO_SHOP_UNIT_EMAIL_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_ASSIGN_TENANT_TO_SHOP_UNIT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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

export default class SendAssignTenantToHouseUnitNotificationJob implements JobContract {
  public key = SEND_ASSIGN_TENANT_TO_SHOP_UNIT_NOTIFICATION_JOB

  public async handle(job) {
    const { tenantId, shopUnitId, landlordId } = job.data

    const tenantShopUnitRent = await TenantShopUnitRentActions.getTenantShopUnitRentDistinct({
      landlordId,
      shopUnitId,
      tenantId,
    })

    if (tenantShopUnitRent === NULL_OBJECT) {
      throw new JobQueueException('Tenant shop unit rent information does not exists')
    }

    const formattedPaidRentAmount = thousandSeparateTheAmount(
      changeAmountToNaira(tenantShopUnitRent.paidRentAmount)
    )

    await MailClient.send({
      sender: {
        email: businessConfig.defaultEmailAddress,
        name: businessConfig.defaultEmailName,
      },
      recipient: {
        email: tenantShopUnitRent.tenant.email,
        name: tenantShopUnitRent.tenant.firstName,
      },
      dataPayload: {
        recipientName: tenantShopUnitRent.tenant.firstName,
        landlordName: `${tenantShopUnitRent.landlord.firstName} ${tenantShopUnitRent.landlord.lastName}`,
        paidRentAmount: `N${formattedPaidRentAmount}`,
        startRentDate: tenantShopUnitRent.startRentDate, // .toFormat(businessConfig.defaultDateTimeFormat),
        endRentDate: tenantShopUnitRent.endRentDate, // .toFormat(businessConfig.defaultDateTimeFormat),
      },
      subject: ASSIGN_TENANT_TO_SHOP_UNIT_EMAIL_SUBJECT,
      template: ASSIGN_TENANT_TO_SHOP_UNIT_EMAIL_EMAIL_TEMPLATE,
    })
  }
}
