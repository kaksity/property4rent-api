import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordActions from 'App/Actions/LandlordActions'
import {
  ERROR,
  LANDLORD_ACCOUNT_LIST_SUCCESSFUL,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import ListLandlordAccountsValidator from 'App/Validators/Admin/V1/LandlordManagement/ListLandlordAccountsValidator'
export default class ListLandlordAccountsController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, response }: HttpContextContract) {
    try {
      try {
        await request.validate(ListLandlordAccountsValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { landlordPayload: landlords, paginationMeta } = await LandlordActions.listLandlords({})

      const mutatedResults = landlords.map((landlord) => {
        return {
          identifier: landlord.identifier,
          first_name: landlord.firstName,
          last_name: landlord.lastName,
          email: landlord.email,
          phone_number: landlord.phoneNumber,
          meta: {
            last_login_date: landlord.lastLoginDate,
            has_activated_account: landlord.hasActivatedAccount === true ? 'Yes' : 'No',
            is_account_verified: landlord.isAccountVerified === true ? 'Yes' : 'No',
            is_account_locked: landlord.isAccountLocked === true ? 'Yes' : 'No',
          },
        }
      })
      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: LANDLORD_ACCOUNT_LIST_SUCCESSFUL,
        results: mutatedResults,
        pagination_meta: paginationMeta,
      })
    } catch (ListLandlordAccountsControllerError) {
      console.log('ListLandlordAccountsController.handle', ListLandlordAccountsControllerError)
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
