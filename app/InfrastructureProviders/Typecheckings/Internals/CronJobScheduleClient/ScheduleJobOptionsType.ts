type ScheduleJobOptionsType = {
  cronExpression: string

  task: () => void | Promise<void>
}

export default ScheduleJobOptionsType
