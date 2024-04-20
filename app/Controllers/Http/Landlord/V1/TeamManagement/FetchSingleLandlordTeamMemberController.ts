import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordActions from 'App/Actions/LandlordActions'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  LANDLORD_TEAM_MEMBER_FETCH_SUCCESSFULLY,
  NULL_OBJECT,
  LANDLORD_TEAM_MEMBER_NOT_FOUND,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class FetchSingleLandlordTeamMemberController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private ok = HttpStatusCodeEnum.OK

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

      const { landlordTeamMemberIdentifier } = request.params()

      const landlordTeamMember = await LandlordTeamMemberActions.getLandlordTeamMemberRecord({
        identifierType: 'identifier',
        identifier: landlordTeamMemberIdentifier,
      })

      if (landlordTeamMember === NULL_OBJECT) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: LANDLORD_TEAM_MEMBER_NOT_FOUND,
        })
      }

      if (landlordTeamMember.landlordId !== loggedInLandlordTeamMember.landlordId) {
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: LANDLORD_TEAM_MEMBER_NOT_FOUND,
        })
      }

      const landlord = await LandlordActions.getLandlordRecord({
        identifierType: 'id',
        identifier: loggedInLandlordTeamMember.landlordId,
      })

      const mutatedLandlordResult = {
        identifier: landlord!.id,
        name: landlord!.name,
        address: landlord!.address,
      }

      const mutatedLandlordTeamMemberResult = {
        identifier: landlordTeamMember.identifier,
        first_name: landlordTeamMember.firstName,
        last_name: landlordTeamMember.lastName,
        phone_number: landlordTeamMember.phoneNumber,
        email: landlordTeamMember.email,
        role: landlordTeamMember.role,
        meta: {
          has_activated_account: landlordTeamMember.hasActivatedAccount,
          is_account_locked: landlordTeamMember.isAccountLocked,
          is_account_verified: landlordTeamMember.isAccountVerified,
          last_login_date: landlordTeamMember.lastLoginDate,
        },
      }

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: LANDLORD_TEAM_MEMBER_FETCH_SUCCESSFULLY,
        results: {
          ...mutatedLandlordResult,
          landlord_team_member: mutatedLandlordTeamMemberResult,
        },
      })
    } catch (FetchSingleLandlordTeamMemberControllerError) {
      console.log(
        '🚀 ~ FetchSingleLandlordTeamMemberController.handle FetchSingleLandlordTeamMemberControllerError ->',
        FetchSingleLandlordTeamMemberControllerError
      )

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
