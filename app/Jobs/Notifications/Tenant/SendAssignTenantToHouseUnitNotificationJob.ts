import { JobContract } from '@ioc:Rocketseat/Bull'
import TenantHouseUnitRentActions from 'App/Actions/TenantHouseUnitRentActions'
import JobQueueException from 'App/Exceptions/JobQueueException'
import changeAmountToNaira from 'App/Helpers/Functions/changeAmountToNaira'
import thousandSeparateTheAmount from 'App/Helpers/Functions/thousandSeparateTheAmount'
import {
  NULL_OBJECT,
  ASSIGN_TENANT_TO_HOUSE_UNIT_EMAIL_SUBJECT,
  ASSIGN_TENANT_TO_HOUSE_UNIT_EMAIL_EMAIL_TEMPLATE,
} from 'App/Helpers/Messages/SystemMessage'
import MailClient from 'App/InfrastructureProviders/Internals/MailClient'
import { SEND_ASSIGN_TENANT_TO_HOUSE_UNIT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
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
  public key = SEND_ASSIGN_TENANT_TO_HOUSE_UNIT_NOTIFICATION_JOB

  public async handle(job) {
    const { tenantId, houseUnitId, landlordId } = job.data

    const tenantHouseUnitRent = await TenantHouseUnitRentActions.getTenantHouseUnitRentDistinct({
      landlordId,
      houseUnitId,
      tenantId,
    })

    if (tenantHouseUnitRent === NULL_OBJECT) {
      throw new JobQueueException('Tenant House Unit rent information does not exists')
    }

    const formattedPaidRentAmount = thousandSeparateTheAmount(
      changeAmountToNaira(tenantHouseUnitRent.paidRentAmount)
    )

    await MailClient.send({
      sender: {
        email: businessConfig.defaultEmailAddress,
        name: businessConfig.defaultEmailName,
      },
      recipient: {
        email: tenantHouseUnitRent.tenant.email,
        name: tenantHouseUnitRent.tenant.firstName,
      },
      dataPayload: {
        recipientName: tenantHouseUnitRent.tenant.firstName,
        landlordName: `${tenantHouseUnitRent.landlord.firstName} ${tenantHouseUnitRent.landlord.lastName}`,
        paidRentAmount: `N${formattedPaidRentAmount}`,
        startRentDate: tenantHouseUnitRent.startRentDate, // .toFormat(businessConfig.defaultDateTimeFormat),
        endRentDate: tenantHouseUnitRent.endRentDate, // .toFormat(businessConfig.defaultDateTimeFormat),
      },
      subject: ASSIGN_TENANT_TO_HOUSE_UNIT_EMAIL_SUBJECT,
      template: ASSIGN_TENANT_TO_HOUSE_UNIT_EMAIL_EMAIL_TEMPLATE,
    })
  }
}
