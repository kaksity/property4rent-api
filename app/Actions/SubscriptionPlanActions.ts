import SubscriptionPlan from 'App/Models/SubscriptionPlan'
import SubscriptionPlanRecordIdentifierOptions from 'App/Typechecking/ModelManagement/SubscriptionPlan/SubscriptionPlanRecordIdentifierOptions'
import CreateSubscriptionPlanRecordOptions from 'App/Typechecking/ModelManagement/SubscriptionPlan/CreateSubscriptionPlanRecordOptions'
import DeleteSubscriptionPlanRecordOptions from 'App/Typechecking/ModelManagement/SubscriptionPlan/DeleteSubscriptionPlanRecordOptions'
import ListSubscriptionPlanRecordOptions from 'App/Typechecking/ModelManagement/SubscriptionPlan/ListSubscriptionPlanRecordOptions'
import UpdateSubscriptionPlanRecordOptions from 'App/Typechecking/ModelManagement/SubscriptionPlan/UpdateSubscriptionPlanRecordOptions'

export default class SubscriptionPlanActions {
  /**
   * @description Method to create a new SubscriptionPlan
   * @author DP
   * @static
   * @param {CreateSubscriptionPlanRecordOptions} createSubscriptionPlanRecordOptions
   * @return {*}  {Promise<SubscriptionPlan>}
   * @memberof SubscriptionPlanActions
   */
  public static async createSubscriptionPlanRecord(
    createSubscriptionPlanRecordOptions: CreateSubscriptionPlanRecordOptions
  ): Promise<SubscriptionPlan> {
    const { createPayload, dbTransactionOptions } = createSubscriptionPlanRecordOptions

    const subscriptionPlan = new SubscriptionPlan()

    Object.assign(subscriptionPlan, createPayload)

    if (dbTransactionOptions.useTransaction) {
      subscriptionPlan.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await subscriptionPlan.save()

    return subscriptionPlan
  }

  /**
   * @description Method to get an SubscriptionPlan by id
   * @author DP
   * @static
   * @param {number} id
   * @return {*}  {(Promise<SubscriptionPlan | null>)}
   * @memberof SubscriptionPlanActions
   */
  public static async getSubscriptionPlanById(id: number): Promise<SubscriptionPlan | null> {
    return SubscriptionPlan.query().where('id', id).first()
  }

  /**
   * @description Method to get SubscriptionPlan by identifier
   * @author DP
   * @static
   * @param {string} identifier
   * @return {*}  {(Promise<SubscriptionPlan | null>)}
   * @memberof SubscriptionPlanActions
   */
  public static async getSubscriptionPlanByIdentifier(
    identifier: string
  ): Promise<SubscriptionPlan | null> {
    return SubscriptionPlan.query().where('identifier', identifier).first()
  }

  /**
   * @description Method to get an SubscriptionPlan record
   * @author DP
   * @static
   * @param {SubscriptionPlanRecordIdentifierOptions} SubscriptionPlanRecordIdentifierOptions
   * @return {*}  {(Promise<SubscriptionPlan | null>)}
   * @memberof SubscriptionPlanActions
   */
  public static async getSubscriptionPlanRecord(
    SubscriptionPlanRecordIdentifierOptions: SubscriptionPlanRecordIdentifierOptions
  ): Promise<SubscriptionPlan | null> {
    const { identifierType, identifier } = SubscriptionPlanRecordIdentifierOptions

    const GetSubscriptionPlanRecord: Record<string, Function> = {
      id: async () => await this.getSubscriptionPlanById(Number(identifier)),
      identifier: async () => await this.getSubscriptionPlanByIdentifier(String(identifier)),
    }

    return GetSubscriptionPlanRecord[identifierType]()
  }

  /**
   * @description Method to update an SubscriptionPlan record
   * @author DP
   * @static
   * @param {UpdateSubscriptionPlanRecordOptions} updateSubscriptionPlanRecordOptions
   * @return {*}  {(Promise<SubscriptionPlan | null>)}
   * @memberof SubscriptionPlanActions
   */
  public static async updateSubscriptionPlanRecord(
    updateSubscriptionPlanRecordOptions: UpdateSubscriptionPlanRecordOptions
  ): Promise<SubscriptionPlan | null> {
    const { identifierOptions, updatePayload, dbTransactionOptions } =
      updateSubscriptionPlanRecordOptions

    const subscriptionPlan = await this.getSubscriptionPlanRecord(identifierOptions)

    if (subscriptionPlan === null) {
      return null
    }

    Object.assign(subscriptionPlan, updatePayload)

    if (dbTransactionOptions.useTransaction) {
      subscriptionPlan.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await subscriptionPlan.save()

    return subscriptionPlan
  }

  /**
   * @description Method to delete an SubscriptionPlan record
   * @author DP
   * @static
   * @param {DeleteSubscriptionPlanRecordOptions} deleteSubscriptionPlanRecordOptions
   * @return {*}
   * @memberof SubscriptionPlanActions
   */
  public static async deleteSubscriptionPlanRecord(
    deleteSubscriptionPlanRecordOptions: DeleteSubscriptionPlanRecordOptions
  ): Promise<void> {
    const { identifierOptions, dbTransactionOptions } = deleteSubscriptionPlanRecordOptions

    const subscriptionPlan = await this.getSubscriptionPlanRecord(identifierOptions)

    if (subscriptionPlan === null) return

    if (dbTransactionOptions.useTransaction) {
      subscriptionPlan.useTransaction(dbTransactionOptions.dbTransaction)
    }

    await subscriptionPlan.softDelete()
  }

  /**
   * @description Method to list SubscriptionPlans
   * @author DP
   * @static
   * @param {ListSubscriptionPlanRecordOptions} listSubscriptionPlanRecordOptions
   * @return {*}  {Promise<{ subscriptionPlanPayload: SubscriptionPlan[]; paginationMeta?: any }>}
   * @memberof SubscriptionPlanActions
   */
  public static async listSubscriptionPlans(
    listSubscriptionPlanRecordOptions: ListSubscriptionPlanRecordOptions
  ): Promise<{ subscriptionPlanPayload: SubscriptionPlan[]; paginationMeta?: any }> {
    const { paginationOptions } = listSubscriptionPlanRecordOptions
    const subscriptionPlanQuery = SubscriptionPlan.query().orderBy('created_at', 'asc')

    if (paginationOptions) {
      const subscriptionPlans = await subscriptionPlanQuery.paginate(
        paginationOptions.page,
        paginationOptions.limit
      )
      return {
        subscriptionPlanPayload: subscriptionPlans.all(),
        paginationMeta: subscriptionPlans.getMeta(),
      }
    }

    const subscriptionPlans = await subscriptionPlanQuery
    return {
      subscriptionPlanPayload: subscriptionPlans,
    }
  }
}
