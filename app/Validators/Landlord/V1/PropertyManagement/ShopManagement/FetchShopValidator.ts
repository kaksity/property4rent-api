import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FetchShopValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    canViewInPublic: ['Yes', 'No'],
  })
  public schema = schema.create({
    per_page: schema.number.optional([rules.range(1, 100)]),
    page: schema.number.optional(),
    can_view_in_public: schema.enum.optional(this.refs.canViewInPublic),
  })

  public messages: CustomMessages = {
    'per_page.number': 'Per page must be a number',
    'per_page.range': 'Per page must be between {{options.start}} to {{options.stop}}',
    'page.number': 'Page must be a number',
    'can_view_in_public.enum': 'Can view in public status is not valid',
  }
}
