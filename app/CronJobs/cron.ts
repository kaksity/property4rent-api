import CronJobScheduleClient from 'App/InfrastructureProviders/Internals/CronJobScheduleClient'
import enqueueCompleteLandlordAccountActivationReminder from 'App/CronJobs/enqueueCompleteLandlordAccountActivationReminder'
import { EVERYDAY_AT_12_AM } from 'App/Typechecking/JobManagement/CronJobTypes'

/*
|--------------------------------------------------------------------------------
| Jobs to Charge Loans and Target Savings whose nextPaymentDate is currentDateTime
|--------------------------------------------------------------------------------
|
*/
CronJobScheduleClient.scheduleJob({
  task: enqueueCompleteLandlordAccountActivationReminder,
  cronExpression: EVERYDAY_AT_12_AM,
})
