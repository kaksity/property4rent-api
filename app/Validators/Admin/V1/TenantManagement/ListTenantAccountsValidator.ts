import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ListTenantAccountsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    per_page: schema.number.optional([rules.range(1, 100)]),
    page: schema.number.optional(),
  })
  public messages: CustomMessages = {
    'per_page.number': 'Per page must be a number',
    'per_page.range': 'Per page must be between {{ options.start }} to {{ options.stop }}',
    'page.number': 'Page must be a numbers',
  }
}
