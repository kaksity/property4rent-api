import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FetchLgasValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    state_identifier: schema.string.optional(),
  })
  public messages: CustomMessages = {
    'state_identifier.string': 'State Identifier must be a string',
  }
}
