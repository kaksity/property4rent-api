import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordTeamMemberActions from 'App/Actions/LandlordTeamMemberActions'
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  LANDLORD_TEAM_MEMBER_UNLOCKED_SUCCESSFULLY,
  NULL_OBJECT,
  LANDLORD_TEAM_MEMBER_NOT_FOUND,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import { SEND_LANDLORD_ACCOUNT_UNLOCKED_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'

export default class UnlockLandlordTeamMemberController {
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

      await LandlordTeamMemberActions.updateLandlordTeamMemberRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: landlordTeamMember.id,
        },
        updatePayload: {
          isAccountLocked: false,
        },
        dbTransactionOptions: {
          useTransaction: false,
        },
      })

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_LANDLORD_ACCOUNT_UNLOCKED_NOTIFICATION_JOB,
        jobPayload: {
          landlordTeamMemberId: landlordTeamMember.id,
        },
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: LANDLORD_TEAM_MEMBER_UNLOCKED_SUCCESSFULLY,
      })
    } catch (UnlockLandlordTeamMemberControllerError) {
      console.log(
        '🚀 ~ UnlockLandlordTeamMemberController.handle UnlockLandlordTeamMemberControllerError ->',
        UnlockLandlordTeamMemberControllerError
      )

      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
