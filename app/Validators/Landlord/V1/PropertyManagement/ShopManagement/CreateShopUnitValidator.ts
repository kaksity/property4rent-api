import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateHouseUnitValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    houseUnitType: ['Flat', 'Apartment'],
  })
  public schema = schema.create({
    number_of_rooms: schema.number([]),
    number_of_toilets: schema.number([]),
    length: schema.number(),
    breadth: schema.number(),
    base_rent_amount: schema.number(),
    minimum_rent_amount: schema.number(),
    maximum_rent_amount: schema.number(),
    possible_use_cases: schema.array([]).members(schema.string()),
  })

  public messages: CustomMessages = {
    'number_of_rooms.required': 'Number of room is required',
    'number_of_toilets.required': 'Number of toilets is required',
    'length.required': 'Length is required',
    'length.number': 'Length must be a number',
    'breadth.required': 'Breadth is required',
    'breadth.number': 'Breadth must be a number',
    'base_rent_amount.required': 'Base amount is required',
    'base_rent_amount.number': 'Base amount must be a number',
    'minimum_rent_amount.required': 'Minimum amount is required',
    'minimum_rent_amount.number': 'Minimum amount must be a number',
    'maximum_rent_amount.required': 'Maximum amount is required',
    'maximum_rent_amount.number': 'Maximum amount must be a number',
    'possible_use_cases.required': 'Possible use cases is required',
    'possible_use_cases.array': 'Possible use cases must be an array',
    'possible_use_cases.*.string': 'Possible use cases must be an array of strings',
  }
}
