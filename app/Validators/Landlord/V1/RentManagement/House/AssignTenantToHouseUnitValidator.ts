import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import businessConfig from 'Config/businessConfig'

export default class AssignTenantToHouseUnitValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_rent_date: schema.date({
      format: businessConfig.defaultDateFormat,
    }),
    end_rent_date: schema.date({
      format: businessConfig.defaultDateFormat,
    }),
    paid_rent_amount: schema.number(),
  })

  public messages: CustomMessages = {
    'start_rent_date.required': 'Start rent date is required',
    'start_rent_date.date.format': 'Start rent date must be a valid date(yyyy-MM-dd)',
    'end_rent_date.required': 'End rent date is required',
    'end_rent_date.date.format': 'End rent date must be a valid date(yyyy-MM-dd)',
    'paid_rent_amount.required': 'Paid rent amount is required',
    'paid_rent_amount.number': 'Paid rent amount must be a number',
  }
}
