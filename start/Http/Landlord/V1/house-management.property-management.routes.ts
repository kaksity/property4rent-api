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

  Route.post('create/house/:houseIdentifier/unit', 'CreateHouseUnitController').as(
    'landlord.v1.property-management.house-management.create-house-unit'
  )

  Route.get('fetch/house/:houseIdentifier/units', 'FetchHouseUnitsController').as(
    'landlord.v1.property-management.house-management.fetch-house-units'
  )

  Route.put(
    'update/house/:houseIdentifier/unit/:houseUnitIdentifier/possible-suitable-tenants',
    'UpdateHouseUnitPossibleSuitableTenantsController'
  ).as(
    'landlord.v1.property-management.house-management.update-house-unit-possible-suitable-tenants'
  )

  Route.put(
    'update/house/:houseIdentifier/unit/:houseUnitIdentifier/rent-amount',
    'UpdateHouseUnitRentAmountController'
  ).as('landlord.v1.property-management.house-management.update-house-unit-rent-amount')
  Route.put(
    'update/house/:houseIdentifier/unit/:houseUnitIdentifier/size',
    'UpdateHouseUnitSizeController'
  ).as('landlord.v1.property-management.house-management.update-house-unit-size')
})
  .prefix('api/v1/landlord/property-management/house-management')
  .middleware('auth:landlord')
  .middleware('checkForCompleteLandlordAccountSetup')
  .namespace('App/Controllers/Http/Landlord/V1/PropertyManagement/HouseManagement')
