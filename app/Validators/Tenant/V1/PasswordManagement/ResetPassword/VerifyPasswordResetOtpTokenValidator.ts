import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyPasswordResetOtpTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true, escape: true }, [
      rules.email(),
      rules.exists({
        table: 'tenants',
        column: 'email',
      }),
    ]),
    token: schema.string({ trim: true, escape: true }, [
      rules.exists({
        table: 'otp_tokens',
        column: 'token',
      }),
    ]),
    password: schema.string({ trim: true, escape: true }, [
      rules.minLength(8),
      rules.maxLength(20),
    ]),
  })
  public messages: CustomMessages = {
    'email.required': 'Email address is required',
    'email.email': 'Email address is not valid',
    'email.exists': 'Email does not exists',
    'token.required': 'Token is required',
    'token.exists': 'Token does not exist',
    'password.required': 'Password is required',
    'password.minLength': 'Password must be at least 8 characters',
    'password.maxLength': 'Password must not exceed 20 characters',
  }
}
