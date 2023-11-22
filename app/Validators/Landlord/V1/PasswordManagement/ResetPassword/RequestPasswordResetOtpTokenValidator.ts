import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestPasswordResetOtpTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true, escape: true }, [
      rules.email(),
      rules.exists({
        table: 'landlords',
        column: 'email',
      }),
    ]),
  })
  public messages: CustomMessages = {
    'email.required': 'Email address is required',
    'email.email': 'Email address is not valid',
    'email.exists': 'Email does not exists',
  }
}
