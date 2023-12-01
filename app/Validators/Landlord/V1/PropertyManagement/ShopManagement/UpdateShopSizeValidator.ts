import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateShopSizeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    length: schema.number(),
    breadth: schema.number(),
  })

  public messages: CustomMessages = {
    'length.required': 'Length is required',
    'length.number': 'Length must be a number',
    'breadth.required': 'Breadth is required',
    'breadth.number': 'Breadth must be a number',
  }
}
