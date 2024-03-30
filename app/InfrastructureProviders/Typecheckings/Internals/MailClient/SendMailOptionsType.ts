type SendMailOptionsType = {
  sender: {
    email: string
    name?: string
  }
  recipient: {
    email: string
    name?: string
  }

  subject: string

  dataPayload?: Object

  template: string
}

export default SendMailOptionsType
