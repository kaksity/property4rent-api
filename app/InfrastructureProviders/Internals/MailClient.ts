import Mail from '@ioc:Adonis/Addons/Mail'
import SendMailOptionsType from 'App/InfrastructureProviders/Typecheckings/Internals/MailClient/SendMailOptionsType'

export default class MailClient {
  /**
   * @description Method to send an email
   * @author DP
   * @param {SendMailOptionsType} sendMailOptions
   * @memberof MailClient
   */
  public static async send(sendMailOptions: SendMailOptionsType) {
    const { sender, recipient, subject, template, dataPayload } = sendMailOptions
    await Mail.use('smtp').send((message) => {
      message
        .from(sender.email, sender.name)
        .to(recipient.email, recipient.name)
        .subject(subject)
        .htmlView(template, dataPayload)
    })
  }
}
