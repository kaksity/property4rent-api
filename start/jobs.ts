const jobs = [
  'App/Jobs/Notifications/SendCompleteLandlordAccountActivationNotificationJob',
  'App/Jobs/Notifications/Landlord/SendWelcomeNewLandlordNotificationJob',
  'App/Jobs/Notifications/Landlord/SendLandlordAccountActivationNotificationJob',
  'App/Jobs/Notifications/Landlord/SendLandlordAccountPasswordResetNotificationJob',
  'App/Jobs/Notifications/Tenant/SendWelcomeNewTenantNotificationJob',
  'App/Jobs/Notifications/Tenant/SendTenantAccountPasswordResetNotificationJob',
  'App/Jobs/Notifications/Tenant/SendTenantAccountActivationNotificationJob',
  'App/Jobs/Notifications/Tenant/SendAssignTenantToHouseUnitNotificationJob',
  'App/Jobs/Notifications/Tenant/SendAssignTenantToShopUnitNotificationJob',
  'App/Jobs/Notifications/Tenant/SendRevokeTenantFromHouseUnitNotificationJob',
  'App/Jobs/Notifications/Tenant/SendRevokeTenantFromShopUnitNotificationJob',
  'App/Jobs/Finance/Landlord/CompleteLandlordWalletSetupJob',
  'App/Jobs/Finance/Tenant/CompleteTenantWalletSetupJob',
]

export default jobs
