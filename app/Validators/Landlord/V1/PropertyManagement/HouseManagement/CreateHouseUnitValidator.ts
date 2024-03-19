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
    length: schema.number(),
    breadth: schema.number(),
    base_amount: schema.number(),
    minimum_amount: schema.number(),
    maximum_amount: schema.number(),
    possible_suitable_tenants: schema.array([]).members(schema.string()),
  })

  public messages: CustomMessages = {
    'house_unit_type.required': 'House unit type is required',
    'house_unit_type.enum': 'House unit type is not valid',
    'number_of_rooms.required': 'Number of room is required',
    'number_of_bathrooms.required': 'Number of bathrooms is required',
    'number_of_kitchens.required': 'Number of kitchen is required',
    'length.required': 'Length is required',
    'length.number': 'Length must be a number',
    'breadth.required': 'Breadth is required',
    'breadth.number': 'Breadth must be a number',
    'base_amount.required': 'Base amount is required',
    'base_amount.number': 'Base amount must be a number',
    'minimum_amount.required': 'Minimum amount is required',
    'minimum_amount.number': 'Minimum amount must be a number',
    'maximum_amount.required': 'Maximum amount is required',
    'maximum_amount.number': 'Maximum amount must be a number',
    'possible_suitable_tenants.required': 'Possible suitable tenants is required',
    'possible_suitable_tenants.array': 'Possible suitable tenants must be an array',
    'possible_suitable_tenants.*.string': 'Possible suitable tenants must be an array of strings',
  }
}
