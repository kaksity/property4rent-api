import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  ERROR,
  OLD_PASSWORD_SUPPLIED_IS_NOT_CORRECT,
  PASSWORD_CHANGED_SUCCESSFULLY,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import Hash from '@ioc:Adonis/Core/Hash'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import ChangePasswordValidator from 'App/Validators/Tenant/V1/PasswordManagement/ChangePassword/ChangePasswordValidator'
import TenantActions from 'App/Actions/TenantActions'
export default class ChangePasswordController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      try {
        await request.validate(ChangePasswordValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { old_password: oldPassword, new_password: newPassword } = request.body()

      const loggedInTenant = auth.user!

      const isOldPasswordSuppliedCorrect = await Hash.verify(loggedInTenant.password, oldPassword)
      if (isOldPasswordSuppliedCorrect === false) {
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: OLD_PASSWORD_SUPPLIED_IS_NOT_CORRECT,
        })
      }

      await TenantActions.updateTenantRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: loggedInTenant.id,
        },
        updatePayload: {
          password: newPassword,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      return response.ok({
        status: SUCCESS,
        message: PASSWORD_CHANGED_SUCCESSFULLY,
        status_code: this.ok,
      })
    } catch (ChangePasswordControllerError) {
      console.log('ChangePasswordController.handle => ', ChangePasswordControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
