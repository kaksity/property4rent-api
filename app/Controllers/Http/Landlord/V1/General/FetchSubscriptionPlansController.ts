import SubscriptionPlanActions from 'App/Actions/SubscriptionPlanActions'
import {
  SUCCESS,
  ERROR,
  SOMETHING_WENT_WRONG,
  SUBSCRIPTION_PLAN_LIST_SUCCESSFUL,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class FetchSubscriptionPlansController {
  private ok = HttpStatusCodeEnum.OK
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

  public async handle({ response }) {
    try {
      const { subscriptionPlanPayload: subscriptionPlans } =
        await SubscriptionPlanActions.listSubscriptionPlans({})

      const mutatedResults = subscriptionPlans.map((subscriptionPlan) => {
        return {
          identifier: subscriptionPlan.identifier,
          name: subscriptionPlan.name,
          price: subscriptionPlan.price,
          duration: subscriptionPlan.duration,
          duration_type: subscriptionPlan.durationType,
        }
      })

      return response.status(this.ok).send({
        status_code: this.ok,
        status: SUCCESS,
        message: SUBSCRIPTION_PLAN_LIST_SUCCESSFUL,
        results: mutatedResults,
      })
    } catch (FetchSubscriptionPlansControllerError) {
      console.log(
        '🚀 ~ FetchSubscriptionPlansController.handle FetchSubscriptionPlansControllerError ->',
        FetchSubscriptionPlansControllerError
      )

      return response.status(this.internalServerError).send({
        status_code: this.internalServerError,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
