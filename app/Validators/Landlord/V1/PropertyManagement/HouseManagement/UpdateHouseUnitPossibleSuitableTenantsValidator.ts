import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateHouseUnitPossibleSuitableTenantsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    possible_suitable_tenants: schema.array([]).members(schema.string()),
  })

  public messages: CustomMessages = {
    'possible_suitable_tenants.required': 'Possible suitable tenants is required',
    'possible_suitable_tenants.array': 'Possible suitable tenants must be an array',
    'possible_suitable_tenants.*.string': 'Possible suitable tenants must be an array of strings',
  }
}
