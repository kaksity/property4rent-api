import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('create/house', 'CreateHouseController').as(
    'landlord.v1.property-management.house-management.create-house'
  )
  Route.get('fetch/house/:houseIdentifier', 'FetchSingleHouseController').as(
    'landlord.v1.property-management.house-management.fetch-single-house'
  )
  Route.get('fetch/houses', 'FetchHousesController').as(
    'landlord.v1.property-management.house-management.fetch-all-houses'
  )
  Route.put('update/house/:houseIdentifier/location', 'UpdateHouseLocationController').as(
    'landlord.v1.property-management.house-management.update-house-location'
  )
  Route.put(
    'update/house/:houseIdentifier/possible-use-cases',
    'UpdateHousePossibleUseCasesController'
  ).as('landlord.v1.property-management.house-management.update-house-possible-use-cases')
  Route.put('update/house/:houseIdentifier/rent-amount', 'UpdateHouseRentAmountController').as(
    'landlord.v1.property-management.house-management.update-house-rent-amount'
  )
  Route.put('update/house/:houseIdentifier/size', 'UpdateHouseSizeController').as(
    'landlord.v1.property-management.house-management.update-house-size'
  )
})
  .prefix('api/v1/landlord/property-management/house-management')
  .middleware('auth:landlord')
  .namespace('App/Controllers/Http/Landlord/V1/PropertyManagement/HouseManagement')
