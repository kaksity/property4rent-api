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
  Route.put(
    'update/shop/:shopIdentifier/possible-use-cases',
    'UpdateShopPossibleUseCasesController'
  ).as('landlord.v1.property-management.shop-management.update-shop-possible-use-cases')
  Route.put('update/shop/:shopIdentifier/rent-amount', 'UpdateShopRentAmountController').as(
    'landlord.v1.property-management.shop-management.update-shop-rent-amount'
  )
  Route.put('update/shop/:shopIdentifier/size', 'UpdateShopSizeController').as(
    'landlord.v1.property-management.shop-management.update-shop-size'
  )
})
  .prefix('api/v1/landlord/property-management/shop-management')
  .middleware('auth:landlord')
  .middleware('checkForCompleteLandlordAccountSetup')
  .namespace('App/Controllers/Http/Landlord/V1/PropertyManagement/ShopManagement')
