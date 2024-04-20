import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ERROR, LANDLORD_ACCOUNT_ACCOUNT_NOT_ALLOWED } from 'App/Helpers/Messages/SystemMessage'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'

export default class CheckForOwnerLandlordTeamMemberAccount {
  private unauthorized = HttpStatusCodeEnum.UNAUTHORIZED

  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const loggedInLandlordTeamMember = auth.use('landlordTeamMember').user!

    if (loggedInLandlordTeamMember.role !== 'owner') {
      return response.unauthorized({
        status: ERROR,
        status_code: this.unauthorized,
        message: LANDLORD_ACCOUNT_ACCOUNT_NOT_ALLOWED,
        results: {
          landlord_team_member_role: loggedInLandlordTeamMember.role,
        },
      })
    }

    await next()
  }
}
