import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AssignTenantToShopValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    shop_identifier: schema.string({ trim: true, escape: true }, [
      rules.exists({
        column: 'identifier',
        table: 'shops',
      }),
    ]),
    tenant_identifier: schema.string({ trim: true, escape: true }, [
      rules.exists({
        column: 'identifier',
        table: 'tenants',
      }),
    ]),
  })

  public messages: CustomMessages = {
    'shop_identifier.required': 'Shop is required',
    'shop_identifier.exists': 'Shop does not exist',
    'tenant_identifier.required': 'Tenant is required',
    'tenant_identifier.exists': 'Tenant does not exist',
  }
}
