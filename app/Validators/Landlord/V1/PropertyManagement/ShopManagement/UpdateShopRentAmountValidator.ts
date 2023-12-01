import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateShopRentAmountValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    base_amount: schema.number(),
    minimum_amount: schema.number(),
    maximum_amount: schema.number(),
  })

  public messages: CustomMessages = {
    'base_amount.required': 'Base amount is required',
    'base_amount.number': 'Base amount must be a number',
    'minimum_amount.required': 'Minimum amount is required',
    'minimum_amount.number': 'Minimum amount must be a number',
    'maximum_amount.required': 'Maximum amount is required',
    'maximum_amount.number': 'Maximum amount must be a number',
  }
}
