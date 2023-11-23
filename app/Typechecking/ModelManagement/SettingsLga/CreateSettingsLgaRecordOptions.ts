import SettingsLgaInterface from 'App/Typechecking/ModelManagement/SettingsLga/SettingsLgaInterface'
import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose//CreateNewRecordGeneric'

type CreateSettingsLgaRecordPayload = Pick<SettingsLgaInterface, 'lgaLabel' | 'stateId'>

type CreateSettingsLgaRecordOptions = CreateNewRecordGeneric<CreateSettingsLgaRecordPayload>

export default CreateSettingsLgaRecordOptions
