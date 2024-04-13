import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RevokeTenantToHouseUnitValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    reason: schema.string({ trim: true, escape: true }),
  })

  public messages: CustomMessages = {
    'reason.required': 'Reason is required',
  }
}
