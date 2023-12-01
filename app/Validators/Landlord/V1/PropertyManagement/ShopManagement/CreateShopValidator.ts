import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateShopValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string({ trim: true, escape: true }),
  })

  public messages: CustomMessages = {
    'description.required': 'Description is required',
    'description.string': 'Description must be a string',
  }
}
