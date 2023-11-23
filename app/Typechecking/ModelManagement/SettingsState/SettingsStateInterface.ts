import { DateTime } from 'luxon'

export default interface SettingsStateInterface {
  id: number

  identifier: string

  stateLabel: string

  createdAt: DateTime

  updatedAt: DateTime

  deletedAt: DateTime
}
