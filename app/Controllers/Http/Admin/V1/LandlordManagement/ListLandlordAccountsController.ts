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

      const { per_page: limit = 100, page = 1 } = request.qs()

      const { landlordPayload: landlords, paginationMeta } = await LandlordActions.listLandlords({
        paginationOptions: {
          page,
          limit,
        },
      })

      const mutatedResults = landlords.map((landlord) => {
        const mutatedSubscriptionPlanResults = {
          identifier: landlord.subscriptionPlan.identifier,
          name: landlord.subscriptionPlan.name,
          price: landlord.subscriptionPlan.price,
          duration: landlord.subscriptionPlan.duration,
          duration_type: landlord.subscriptionPlan.durationType,
        }

        return {
          identifier: landlord.identifier,
          name: landlord.name,
          mutated_name: landlord.mutatedName,
          address: landlord.address,
          is_subscription_plan_active: landlord.isSubscriptionPlanActive,
          subscription_plan: mutatedSubscriptionPlanResults,
          has_paid_subscription_fee: landlord.hasPaidSubscriptionFee,
          start_subscription_date: landlord.startSubscriptionDate,
          end_subscription_date: landlord.endSubscriptionDate,
          number_of_landlord_team_members: landlord.landlordTeamMembers.length,
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
