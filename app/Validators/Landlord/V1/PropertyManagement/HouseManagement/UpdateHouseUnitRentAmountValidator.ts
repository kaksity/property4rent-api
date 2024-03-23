import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateHouseUnitRentAmountValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    base_rent_amount: schema.number(),
    minimum_rent_amount: schema.number(),
    maximum_rent_amount: schema.number(),
  })

  public messages: CustomMessages = {
    'base_rent_amount.required': 'Base amount is required',
    'base_rent_amount.number': 'Base amount must be a number',
    'minimum_rent_amount.required': 'Minimum amount is required',
    'minimum_rent_amount.number': 'Minimum amount must be a number',
    'maximum_rent_amount.required': 'Maximum amount is required',
    'maximum_rent_amount.number': 'Maximum amount must be a number',
  }
}
