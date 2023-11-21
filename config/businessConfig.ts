import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'

const businessConfig = {
  accessTokenExpirationTimeFrameInMinutes: Env.get('ACCESS_TOKEN_EXPIRATION_TIME_FRAME_IN_MINUTES'),

  otpTokenExpirationTimeFrameInMinutes: Env.get('OTP_TOKEN_EXPIRATION_TIME_FRAME_IN_MINUTES'),

  currentDateTime: DateTime.now(),
}

export default businessConfig
