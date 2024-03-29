import Bull from '@ioc:Rocketseat/Bull'
import AddJobToQueueOptionsType from 'App/InfrastructureProviders/Typecheckings/Internals/QueueClient/AddJobToQueueOptionsType'
import AddScheduleJobToQueueOptionsType from 'App/InfrastructureProviders/Typecheckings/Internals/QueueClient/AddScheduleJobToQueueOptionsType'

export default class QueueClient {
  /**
   * @description Method adds a job to queue
   * @author DP
   * @static
   * @return {*}  {Promise<void>}
   * @memberof QueueClient
   */
  public static async addJobToQueue(addJobToQueueOptions: AddJobToQueueOptionsType): Promise<void> {
    const { jobIdentifier, jobPayload } = addJobToQueueOptions
    await Bull.add(jobIdentifier, jobPayload)
  }

  /**
   * @description Method add a schedule job to a queue
   * @author DP
   * @static
   * @return {*}  {Promise<void>}
   * @memberof QueueClient
   */
  public static async addScheduleJobToQueue(
    addScheduleJobToQueueOptions: AddScheduleJobToQueueOptionsType
  ): Promise<void> {
    const { jobIdentifier, jobPayload, scheduleTime } = addScheduleJobToQueueOptions

    await Bull.schedule(jobIdentifier, jobPayload, scheduleTime.toJSDate())
  }
}
