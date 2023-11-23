import { DateTime } from 'luxon'

export default interface SettingsLgaInterface {
  id: number

  identifier: string

  lgaLabel: string

  stateId: number

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}
