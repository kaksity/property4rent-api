import { CronJob } from 'cron'
import ScheduleJobOptionsType from 'App/InfrastructureProviders/Typecheckings/Internals/CronJobScheduleClient/ScheduleJobOptionsType'

export default class CronJobScheduleClient {
  /**
   * @description Method to schedule job
   * @author DP
   * @param {ScheduleJobOptions} scheduleJobOptions
   * @static
   * @memberof ScheduleClient
   */
  public static scheduleJob(scheduleJobOptions: ScheduleJobOptionsType) {
    const { cronExpression, task } = scheduleJobOptions

    return new CronJob(cronExpression, task, null, true)
  }
}
