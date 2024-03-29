import { DateTime } from 'luxon'

type AddScheduleJobToQueueOptionsType = {
  jobIdentifier: string

  jobPayload: Object

  scheduleTime: DateTime
}

export default AddScheduleJobToQueueOptionsType
