import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateShopUnitPossibleUseCasesValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    possible_use_cases: schema.array([]).members(schema.string()),
  })

  public messages: CustomMessages = {
    'possible_use_cases.required': 'Possible use cases is required',
    'possible_use_cases.array': 'Possible use cases must be an array',
    'possible_use_cases.*.string': 'Possible use cases must be an array of strings',
  }
}
