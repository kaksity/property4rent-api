import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateHouseUnitValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    houseUnitType: ['Flat', 'Apartment'],
  })
  public schema = schema.create({
    house_unit_type: schema.enum(this.refs.houseUnitType),
    number_of_rooms: schema.number([]),
    number_of_bathrooms: schema.number([]),
    number_of_kitchens: schema.number([]),
  })

  public messages: CustomMessages = {
    'house_unit_type.required': 'House unit type is required',
    'house_unit_type.enum': 'House unit type is not valid',
    'number_of_rooms.required': 'Number of room is required',
    'number_of_bathrooms.required': 'Number of bathrooms is required',
    'number_of_kitchens.required': 'Number of kitchen is required',
  }
}
