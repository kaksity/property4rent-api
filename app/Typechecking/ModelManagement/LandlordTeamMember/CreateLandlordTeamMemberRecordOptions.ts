import CreateNewRecordGeneric from 'App/Typechecking/GeneralPurpose/CreateNewRecordGeneric'
import LandlordTeamMemberInterface from 'App/Typechecking/ModelManagement/LandlordTeamMember/LandlordTeamMemberInterface'

type CreateLandlordTeamMemberPayloadOptions = Pick<
  LandlordTeamMemberInterface,
  'email' | 'firstName' | 'lastName' | 'password' | 'phoneNumber' | 'landlordId'
>

type CreateLandlordTeamMemberRecordOptions =
  CreateNewRecordGeneric<CreateLandlordTeamMemberPayloadOptions>

export default CreateLandlordTeamMemberRecordOptions
