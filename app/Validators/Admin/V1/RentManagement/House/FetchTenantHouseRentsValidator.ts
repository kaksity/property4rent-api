import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FetchTenantHouseUnitRentsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    rentStatus: ['active', 'inactive', 'expired'],
  })

  public schema = schema.create({
    page: schema.number.optional(),
    per_page: schema.number.optional(),
    house_unit_identifier: schema.string.optional(),
    tenant_identifier: schema.string.optional(),
    landlord_identifier: schema.string.optional(),
    rent_status: schema.enum.optional(this.refs.rentStatus),
  })

  public messages: CustomMessages = {
    'page.number': 'Page must be a number',
    'per_page.number': 'Per Page must be a number',
    'house_unit_identifier.string': 'House unit must be a valid string',
    'tenant_identifier.string': 'Tenant must be a valid string',
    'landlord_identifier.string': 'Landlord must be a valid string',
    'rent_status.enum': 'Rent status is not valid',
  }
}
