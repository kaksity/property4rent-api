export default class JobQueueException extends Error {
  constructor(message: string) {
    super(message)
  }
}
