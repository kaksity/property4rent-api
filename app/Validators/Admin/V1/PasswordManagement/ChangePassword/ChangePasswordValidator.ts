import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    old_password: schema.string({ trim: true, escape: true }, [
      rules.minLength(8),
      rules.maxLength(20),
    ]),
    new_password: schema.string({ trim: true, escape: true }, [
      rules.minLength(8),
      rules.maxLength(20),
    ]),
  })
  public messages: CustomMessages = {
    'old_password.required': 'Old password is required',
    'old_password.minLength': 'Old password must be at least 8 characters',
    'old_password.maxLength': 'Old password must not exceed 20 characters',
    'new_password.required': 'New password is required',
    'new_password.minLength': 'New password must be at least 8 characters',
    'new_password.maxLength': 'New password must not exceed 20 characters',
  }
}
