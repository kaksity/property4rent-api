import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateNewLandlordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string({ trim: true, escape: true }),
    last_name: schema.string({ trim: true, escape: true }),
    phone_number: schema.string({ trim: true, escape: true }, [
      rules.minLength(11),
      rules.maxLength(11),
    ]),
    email: schema.string({ trim: true, escape: true }, [
      rules.email(),
      rules.unique({
        table: 'landlord_team_members',
        column: 'email',
      }),
    ]),
    password: schema.string({ trim: true, escape: true }, [
      rules.minLength(8),
      rules.maxLength(20),
    ]),
    organization_name: schema.string({ trim: true, escape: true }),
    organization_address: schema.string({ trim: true, escape: true }),
    subscription_plan_identifier: schema.string({ trim: true, escape: true }, [
      rules.exists({
        table: 'subscription_plans',
        column: 'identifier',
      }),
    ]),
  })

  public messages: CustomMessages = {
    'first_name.required': 'First name is required',
    'last_name.required': 'Last name is required',
    'phone_number.required': 'Phone number is required',
    'phone_number.minLength': 'Phone number must be 11 digits',
    'phone_number.maxLength': 'Phone number must be 11 digits',
    'email.required': 'Email address is required',
    'email.email': 'Email address must be a valid email',
    'email.unique': 'Email address has already been taken',
    'password.required': 'Password is required',
    'password.minLength': 'Password must be at least 8 characters',
    'password.maxLength': 'Password must not exceed 20 characters',
    'organization_name.required': 'Organization name is required',
    'organization_address.required': 'Organization address is required',
    'subscription_plan_identifier.required': 'Subscription plan is required',
    'subscription_plan_identifier.exists': 'Subscription plan does not exists',
  }
}
