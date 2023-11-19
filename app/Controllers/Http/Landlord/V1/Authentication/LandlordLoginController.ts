import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordActions from 'App/Actions/LandlordActions'
import {
  LANDLORD_AUTHENTICATION_SUCCESSFUL,
  ERROR,
  INVALID_CREDENTIALS,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import LandlordLoginValidator from 'App/Validators/Landlord/V1/Authentication/LandlordLoginValidator'
import businessConfig from 'Config/businessConfig'

export default class LandlordLoginController {
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      try {
        await request.validate(LandlordLoginValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email, password } = request.body()

      const landlord = await LandlordActions.getLandlordRecord({
        identifierType: 'email',
        identifier: email,
      })

      const isLandlordPasswordValid = await Hash.verify(landlord!.password, password)

      if (isLandlordPasswordValid === false) {
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: INVALID_CREDENTIALS,
        })
      }

      await auth.use('landlord').revoke()

      const accessToken = await auth.use('landlord').attempt(email, password, {
        expiresIn: `${businessConfig.accessTokenExpirationTimeFrameInMinutes} minutes`,
      })

      const mutatedAdminPayload = {
        identifier: landlord!.identifier,
        first_name: landlord!.firstName,
        last_name: landlord!.lastName,
        email: landlord!.email,
        phone_number: landlord!.phoneNumber,
        access_credentials: accessToken,
        created_at: landlord!.createdAt,
      }

      return response.ok({
        status_code: this.ok,
        status: SUCCESS,
        message: LANDLORD_AUTHENTICATION_SUCCESSFUL,
        results: mutatedAdminPayload,
      })
    } catch (LandlordLoginControllerError) {
      console.log('LandlordLoginController.handle =>', LandlordLoginControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
