import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TenantActions from 'App/Actions/TenantActions'
import {
  ERROR,
  TENANT_ACCOUNT_NOT_FOUND,
  TENANT_ACCOUNT_UPDATE_SUCCESSFUL,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class LockTenantAccountController {
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ request, response }: HttpContextContract) {
    try {
      const { tenantIdentifier } = request.params()

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'identifier',
        identifier: tenantIdentifier,
      })

      if (tenant === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: TENANT_ACCOUNT_NOT_FOUND,
        })
      }

      await TenantActions.updateTenantRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: tenant.id,
        },
        updatePayload: {
          isAccountLocked: true,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })
      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: TENANT_ACCOUNT_UPDATE_SUCCESSFUL,
      })
    } catch (LockTenantAccountControllerError) {
      console.log('LockTenantAccountController.handle => ', LockTenantAccountControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
