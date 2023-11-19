import Env from '@ioc:Adonis/Core/Env'

const businessConfig = {
  accessTokenExpirationTimeFrameInMinutes: Env.get('ACCESS_TOKEN_EXPIRATION_TIME_FRAME_IN_MINUTES'),
}

export default businessConfig
