import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminActions from 'App/Actions/AdminActions'
import {
  ADMIN_AUTHENTICATION_SUCCESSFUL,
  ERROR,
  INVALID_CREDENTIALS,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import AdminLoginValidator from 'App/Validators/Admin/V1/Authentication/AdminLoginValidator'
import businessConfig from 'Config/businessConfig'

export default class AdminLoginController {
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      try {
        await request.validate(AdminLoginValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          message: VALIDATION_ERROR,
          status_code: this.unprocessableEntity,
          results: validationError.messages,
        })
      }

      const { email, password } = request.body()

      const admin = await AdminActions.getAdminRecord({
        identifierType: 'email',
        identifier: email,
      })

      const isAdminPasswordValid = await Hash.verify(admin!.password, password)

      if (isAdminPasswordValid === false) {
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: INVALID_CREDENTIALS,
        })
      }

      await auth.use('admin').revoke()

      const accessToken = await auth.use('admin').attempt(email, password, {
        expiresIn: `${businessConfig.accessTokenExpirationTimeFrameInMinutes} minutes`,
      })

      const mutatedAdminPayload = {
        identifier: admin!.identifier,
        first_name: admin!.firstName,
        last_name: admin!.lastName,
        email: admin!.email,
        phone_number: admin!.phoneNumber,
        access_credentials: accessToken,
        created_at: admin!.createdAt,
      }

      return response.ok({
        status_code: this.ok,
        status: SUCCESS,
        message: ADMIN_AUTHENTICATION_SUCCESSFUL,
        results: mutatedAdminPayload,
      })
    } catch (AdminLoginControllerError) {
      console.log(`AdminLoginController.handle => ${AdminLoginControllerError}`)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
