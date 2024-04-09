const jobs = [
  'App/Jobs/Notifications/SendCompleteLandlordAccountActivationNotificationJob',
  'App/Jobs/Notifications/Landlord/SendWelcomeNewLandlordNotificationJob',
  'App/Jobs/Notifications/Landlord/SendLandlordAccountActivationNotificationJob',
  'App/Jobs/Notifications/Landlord/SendLandlordAccountPasswordResetNotificationJob',
  'App/Jobs/Notifications/Tenant/SendWelcomeNewTenantNotificationJob',
  'App/Jobs/Notifications/Tenant/SendTenantAccountPasswordResetNotificationJob',
  'App/Jobs/Notifications/Tenant/SendTenantAccountActivationNotificationJob',
  'App/Jobs/Notifications/Tenant/SendAssignTenantToHouseUnitNotificationJob',
  'App/Jobs/Notifications/Tenant/SendRevokeTenantFromHouseUnitNotificationJob',
]

export default jobs
