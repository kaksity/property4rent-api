const jobs = [
  'App/Jobs/Notifications/SendCompleteLandlordAccountActivationNotificationJob',
  'App/Jobs/Notifications/SendAssignTenantToHouseUnitNotificationJob',
  'App/Jobs/Notifications/SendRevokeTenantFromHouseUnitNotificationJob',
  'App/Jobs/Notifications/Landlord/SendWelcomeNewLandlordNotificationJob',
  'App/Jobs/Notifications/Landlord/SendLandlordAccountActivationNotificationJob',
  'App/Jobs/Notifications/Landlord/SendLandlordAccountPasswordResetNotificationJob',
  'App/Jobs/Notifications/Tenant/SendWelcomeNewTenantNotificationJob',
  'App/Jobs/Notifications/Tenant/SendTenantAccountPasswordResetNotificationJob',
  'App/Jobs/Notifications/Tenant/SendTenantAccountActivationNotificationJob',
]

export default jobs
