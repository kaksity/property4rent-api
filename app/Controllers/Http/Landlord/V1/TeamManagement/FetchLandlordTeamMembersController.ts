import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordActions from 'App/Actions/LandlordActions'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  LANDLORD_TEAM_MEMBERS_LIST_FETCH_SUCCESSFULLY,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import FetchLandlordTeamMembersValidator from 'App/Validators/Landlord/V1/TeamManagement/FetchLandlordTeamMembersValidator'

export default class FetchLandlordTeamMembersController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private ok = HttpStatusCodeEnum.OK
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, auth, response }: HttpContextContract) {
    try {
      try {
        await request.validate(FetchLandlordTeamMembersValidator)
      } catch (validationError) {
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { page = 1, per_page: limit = 20 } = request.qs()

      const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

      const { landlordTeamMemberPayload: landlordTeamMembers, paginationMeta } =
        await LandlordTeamMemberActions.listLandlordTeamMembers({
          filterRecordOptions: {
            landlordId: loggedInLandlordTeamMember.landlordId,
          },
          paginationOptions: {
            page,
            limit,
          },
        })

      const landlord = await LandlordActions.getLandlordRecord({
        identifierType: 'id',
        identifier: loggedInLandlordTeamMember.landlordId,
      })

      const mutatedLandlordResult = {
        identifier: landlord!.id,
        name: landlord!.name,
        address: landlord!.address,
      }

      const mutatedLandlordTeamMembersResult = landlordTeamMembers.map((landlordTeamMember) => {
        return {
          identifier: landlordTeamMember.identifier,
          first_name: landlordTeamMember.firstName,
          last_name: landlordTeamMember.lastName,
          email: landlordTeamMember.email,
          last_login_date: landlordTeamMember.lastLoginDate,
        }
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: LANDLORD_TEAM_MEMBERS_LIST_FETCH_SUCCESSFULLY,
        results: {
          ...mutatedLandlordResult,
          landlord_team_members: mutatedLandlordTeamMembersResult,
        },
        pagination_meta: paginationMeta,
      })
    } catch (FetchLandlordTeamMembersControllerError) {
      console.log(
        '🚀 ~ FetchLandlordTeamMembersController.handle FetchLandlordTeamMembersControllerError ->',
        FetchLandlordTeamMembersControllerError
      )

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
