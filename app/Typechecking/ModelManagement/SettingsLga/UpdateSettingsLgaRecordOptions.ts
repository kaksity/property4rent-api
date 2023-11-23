import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import SettingsLgaRecordIdentifierOptions from 'App/Typechecking/ModelManagement/SettingsLga/SettingsLgaRecordIdentifierOptions'
import SettingsLgaInterface from 'App/Typechecking/ModelManagement/SettingsLga/SettingsLgaInterface'

type UpdateSettingsLgaRecordPayload = Partial<SettingsLgaInterface>

type UpdateSettingsLgaRecordOptions = UpdateRecordGeneric<
  UpdateSettingsLgaRecordPayload,
  SettingsLgaRecordIdentifierOptions
>

export default UpdateSettingsLgaRecordOptions
