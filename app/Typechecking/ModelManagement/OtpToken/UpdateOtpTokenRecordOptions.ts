import UpdateRecordGeneric from 'App/Typechecking/GeneralPurpose/UpdateRecordGeneric'
import OtpTokenInterface from 'App/Typechecking/ModelManagement/OtpToken/OtpTokenInterface'
import OtpTokenRecordIdentifierOptions from 'App/Typechecking/ModelManagement/OtpToken/OtpTokenRecordIdentifierOptions'

type UpdateOtpTokenPayloadOptions = Partial<OtpTokenInterface>

type UpdateOtpTokenRecordOptions = UpdateRecordGeneric<
  UpdateOtpTokenPayloadOptions,
  OtpTokenRecordIdentifierOptions
>

export default UpdateOtpTokenRecordOptions
