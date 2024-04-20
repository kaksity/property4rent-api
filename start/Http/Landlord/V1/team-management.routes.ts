import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.get('fetch/team-members', 'FetchLandlordTeamMembersController').as(
    'landlord.v1.team-management.fetch-team-members'
  )
  Route.get(
    'fetch/team-member/:landlordTeamMemberIdentifier',
    'FetchSingleLandlordTeamMemberController'
  ).as('landlord.v1.team-management.fetch-single-team-member')
  Route.post('create/team-member', 'CreateNewLandlordTeamMemberController').as(
    'landlord.v1.team-management.create-new-landlord-team-member'
  )
})
  .middleware('auth:landlordTeamMember')
  .middleware('checkForCompleteLandlordTeamMemberAccountSetup')
  .prefix('api/v1/landlord/team-management')
  .namespace('App/Controllers/Http/Landlord/V1/TeamManagement')
