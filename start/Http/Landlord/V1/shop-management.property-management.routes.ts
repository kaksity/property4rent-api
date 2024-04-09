import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('create/shop', 'CreateShopController').as(
    'landlord.v1.property-management.shop-management.create-shop'
  )

  Route.get('fetch/shop/:shopIdentifier', 'FetchSingleShopController').as(
    'landlord.v1.property-management.shop-management.fetch-single-shop'
  )
  Route.get('fetch/shops', 'FetchShopsController').as(
    'landlord.v1.property-management.shop-management.fetch-all-shops'
  )
  Route.put('update/shop/:shopIdentifier/location', 'UpdateShopLocationController').as(
    'landlord.v1.property-management.shop-management.update-shop-location'
  )

  Route.post('create/shop/:shopIdentifier/unit', 'CreateShopUnitController').as(
    'landlord.v1.property-management.shop-management.create-shop-unit'
  )

  Route.get('fetch/shop/:shopIdentifier/units', 'FetchShopUnitsController').as(
    'landlord.v1.property-management.shop-management.fetch-shop-units'
  )

  Route.put(
    'update/shop/:shopIdentifier/unit/:shopUnitIdentifier/possible-suitable-tenants',
    'UpdateShopUnitPossibleSuitableTenantsController'
  ).as('landlord.v1.property-management.shop-management.update-shop-unit-possible-suitable-tenants')

  Route.put(
    'update/shop/:shopIdentifier/unit/:shopUnitIdentifier/rent-amount',
    'UpdateShopUnitRentAmountController'
  ).as('landlord.v1.property-management.shop-management.update-shop-unit-rent-amount')
  Route.put(
    'update/shop/:shopIdentifier/unit/:shopUnitIdentifier/size',
    'UpdateShopUnitSizeController'
  ).as('landlord.v1.property-management.shop-management.update-shop-unit-size')
})
  .prefix('api/v1/landlord/property-management/shop-management')
  .middleware('auth:landlord')
  .middleware('checkForCompleteLandlordAccountSetup')
  .namespace('App/Controllers/Http/Landlord/V1/PropertyManagement/ShopManagement')
