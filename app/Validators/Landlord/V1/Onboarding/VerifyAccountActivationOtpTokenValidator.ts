import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyAccountActivationOtpTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string({ trim: true, escape: true }, [
      rules.exists({
        table: 'otp_tokens',
        column: 'token',
      }),
    ]),
  })
  public messages: CustomMessages = {
    'token.required': 'Token is required',
    'token.exists': 'Token does not exist',
  }
}
