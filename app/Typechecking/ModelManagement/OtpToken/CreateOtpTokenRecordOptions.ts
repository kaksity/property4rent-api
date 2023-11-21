import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import OtpTokenInterface from 'App/Typechecking/ModelManagement/OtpToken/OtpTokenInterface'

type CreateOtpTokenPayloadOptions = Pick<
  OtpTokenInterface,
  'purpose' | 'token' | 'expiresAt' | 'authorId'
>

type CreateOtpTokenRecordOptions = CreateNewRecordGeneric<CreateOtpTokenPayloadOptions>

export default CreateOtpTokenRecordOptions
