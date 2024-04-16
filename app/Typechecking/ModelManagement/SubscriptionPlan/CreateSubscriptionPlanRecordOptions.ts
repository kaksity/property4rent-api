import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import SubscriptionPlanInterface from 'App/Typechecking/ModelManagement/SubscriptionPlan/SubscriptionPlanInterface'

type CreateSubscriptionPlanPayloadOptions = Pick<
  SubscriptionPlanInterface,
  'email' | 'firstName' | 'lastName' | 'password' | 'phoneNumber'
>

type CreateSubscriptionPlanRecordOptions =
  CreateNewRecordGeneric<CreateSubscriptionPlanPayloadOptions>

export default CreateSubscriptionPlanRecordOptions
