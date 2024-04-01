const jobs = [
  'App/Jobs/Notifications/SendCompleteLandlordAccountActivationNotificationJob',
  'App/Jobs/Notifications/SendAssignTenantToHouseUnitNotificationJob',
  'App/Jobs/Notifications/SendRevokeTenantFromHouseUnitNotificationJob',
  'App/Jobs/Notifications/SendWelcomeNewTenantNotificationJob',
  'App/Jobs/Notifications/Landlord/SendWelcomeNewLandlordNotificationJob',
  'App/Jobs/Notifications/Landlord/SendLandlordAccountActivationNotificationJob',
  'App/Jobs/Notifications/Landlord/SendLandlordAccountPasswordResetNotificationJob',
  'App/Jobs/Notifications/Tenant/SendTenantAccountPasswordResetNotificationJob',
]

export default jobs
