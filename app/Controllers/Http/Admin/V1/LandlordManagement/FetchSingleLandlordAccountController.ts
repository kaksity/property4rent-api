import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordActions from 'App/Actions/LandlordActions'
import {
  ERROR,
  LANDLORD_ACCOUNT_FETCHED_SUCCESSFUL,
  LANDLORD_ACCOUNT_NOT_FOUND,
  NOT_APPLICABLE,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
export default class FetchSingleLandlordAccountController {
  private ok = HttpStatusCodeEnum.OK
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ request, response }: HttpContextContract) {
    try {
      const { landlordIdentifier } = request.params()

      const landlord = await LandlordActions.getLandlordRecord({
        identifierType: 'identifier',
        identifier: landlordIdentifier,
      })

      if (landlord === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: LANDLORD_ACCOUNT_NOT_FOUND,
        })
      }

      const mutatedLandlordTeamMemberResults = landlord.landlordTeamMembers.map(
        (landlordTeamMember) => {
          return {
            identifier: landlordTeamMember.identifier,
            first_name: landlordTeamMember.firstName,
            last_name: landlordTeamMember.lastName,
            email: landlordTeamMember.email,
            phone_number: landlordTeamMember.phoneNumber,
            meta: {
              last_login_date: landlordTeamMember.lastLoginDate ?? NOT_APPLICABLE,
              has_activated_account: landlordTeamMember.hasActivatedAccount,
              is_account_verified: landlordTeamMember.isAccountVerified,
              is_account_locked: landlordTeamMember.isAccountLocked,
            },
          }
        }
      )

      const mutatedSubscriptionPlanResults = {
        identifier: landlord.subscriptionPlan.identifier,
        name: landlord.subscriptionPlan.name,
        price: landlord.subscriptionPlan.price,
        duration: landlord.subscriptionPlan.duration,
        duration_type: landlord.subscriptionPlan.durationType,
      }

      const mutatedResults = {
        identifier: landlord.identifier,
        name: landlord.name,
        mutated_name: landlord.mutatedName,
        address: landlord.address,
        is_subscription_plan_active: landlord.isSubscriptionPlanActive,
        subscription_plan: mutatedSubscriptionPlanResults,
        has_paid_subscription_fee: landlord.hasPaidSubscriptionFee,
        start_subscription_date: landlord.startSubscriptionDate,
        end_subscription_date: landlord.endSubscriptionDate,
        landlord_team_members: mutatedLandlordTeamMemberResults,
      }

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: LANDLORD_ACCOUNT_FETCHED_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (FetchSingleLandlordAccountControllerError) {
      console.log(
        'FetchSingleLandlordAccountController.handle => ',
        FetchSingleLandlordAccountControllerError
      )
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
