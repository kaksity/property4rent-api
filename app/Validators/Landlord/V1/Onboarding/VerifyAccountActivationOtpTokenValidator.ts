import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyAccountActivationOtpTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true, escape: true }, [
      rules.email(),
      rules.exists({
        table: 'landlords',
        column: 'email',
      }),
    ]),
    token: schema.string({ trim: true, escape: true }, [
      rules.exists({
        table: 'otp_tokens',
        column: 'token',
      }),
    ]),
  })
  public messages: CustomMessages = {
    'email.required': 'Email address is required',
    'email.email': 'Email address is not valid',
    'email.exists': 'Email does not exists',
    'token.required': 'Token is required',
    'token.exists': 'Token does not exist',
  }
}
