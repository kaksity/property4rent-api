import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateHouseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string({ trim: true, escape: true }),
    lga_identifier: schema.string({ trim: true, escape: true }, [
      rules.exists({
        table: 'settings_lgas',
        column: 'identifier',
      }),
    ]),
    area: schema.string({ trim: true, escape: true }),
    nearest_landmark: schema.string.optional({ trim: true, escape: true }, []),
    longitude: schema.string.optional({ trim: true, escape: true }),
    latitude: schema.string.optional({ trim: true, escape: true }),
  })

  public messages: CustomMessages = {
    'description.required': 'Description is required',
    'description.string': 'Description must be a string',
    'lga_identifier.required': 'LGA is required',
    'lga_identifier.string': 'LGA must be a string',
    'lga_identifier.exists': 'LGA is does not exists',
    'area.required': 'Area is required',
    'area.string': 'Area must be a string',
    'nearest_landmark': 'Nearest landmark must be a string',
    'longitude.string': 'Longitude must be a string',
    'latitude.string': 'Latitude must be a string',
  }
}
