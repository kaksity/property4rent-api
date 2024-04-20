import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SetWalletPinValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    wallet_pin: schema.string({ trim: true, escape: true }, [
      rules.minLength(6),
      rules.maxLength(6),
    ]),
  })

  public messages: CustomMessages = {
    'wallet_pin.required': 'Wallet pin is required',
    'wallet_pin.minLength': 'Wallet pin must be 6 digits',
    'wallet_pin.maxLength': 'Wallet pin must be 6 digits',
  }
}
