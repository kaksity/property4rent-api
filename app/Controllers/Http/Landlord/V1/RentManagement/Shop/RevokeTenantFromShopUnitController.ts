import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ShopUnitActions from 'App/Actions/ShopUnitActions'
import TenantActions from 'App/Actions/TenantActions'
import TenantShopUnitRentActions from 'App/Actions/TenantShopUnitRentActions'
import TenantShopUnitRentRevocationActions from 'App/Actions/TenantShopUnitRentRevocationActions'
import {
  ERROR,
  SHOP_UNIT_ALREADY_EMPTY,
  SHOP_UNIT_NOT_ASSIGNED_TO_TENANT,
  SHOP_UNIT_NOT_FOUND,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  TENANT_ACCOUNT_NOT_FOUND,
  TENANT_SHOP_RENT_REVOKED_SUCCESSFULLY,
  VALIDATION_ERROR,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import { SEND_REVOKE_TENANT_FROM_SHOP_UNIT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'
import RevokeTenantFromShopUnitValidator from 'App/Validators/Landlord/V1/RentManagement/Shop/RevokeTenantFromShopUnitValidator'

export default class RevokeTenantFromShopUnitController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private ok = HttpStatusCodeEnum.OK
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST
  private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY

  public async handle({ request, auth, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      try {
        await request.validate(RevokeTenantFromShopUnitValidator)
      } catch (validationError) {
        await dbTransaction.rollback()
        return response.unprocessableEntity({
          status: ERROR,
          status_code: this.unprocessableEntity,
          message: VALIDATION_ERROR,
          results: validationError.messages,
        })
      }

      const { shopUnitIdentifier, tenantIdentifier } = request.params()

      const { reason } = request.body()
      const loggedInLandlord = auth.use('landlordTeamMember').user!

      const shopUnit = await ShopUnitActions.getShopUnitRecord({
        identifierType: 'identifier',
        identifier: shopUnitIdentifier,
      })

      if (shopUnit === NULL_OBJECT) {
        await dbTransaction.rollback()
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: SHOP_UNIT_NOT_FOUND,
        })
      }

      if (shopUnit.shop.landlordId !== loggedInLandlord.id) {
        await dbTransaction.rollback()
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: SHOP_UNIT_NOT_FOUND,
        })
      }

      if (shopUnit.occupationStatus === 'empty') {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: SHOP_UNIT_ALREADY_EMPTY,
        })
      }

      const tenant = await TenantActions.getTenantRecord({
        identifierType: 'identifier',
        identifier: tenantIdentifier,
      })

      if (tenant === NULL_OBJECT) {
        await dbTransaction.rollback()
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: TENANT_ACCOUNT_NOT_FOUND,
        })
      }

      const tenantShopUnitRent = await TenantShopUnitRentActions.getTenantShopUnitRentDistinct({
        tenantId: tenant.id,
        shopUnitId: shopUnit.id,
        landlordId: loggedInLandlord.id,
      })

      if (tenantShopUnitRent === NULL_OBJECT) {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: SHOP_UNIT_NOT_ASSIGNED_TO_TENANT,
        })
      }

      await TenantShopUnitRentActions.updateTenantShopUnitRentRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: tenantShopUnitRent.id,
        },
        updatePayload: {
          shopUnitId: shopUnit.id,
          tenantId: tenant.id,
          shopRentAmount: shopUnit.baseRentAmount,
          rentStatus: 'inactive',
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await ShopUnitActions.updateShopUnitRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: shopUnit.id,
        },
        updatePayload: {
          occupationStatus: 'empty',
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await TenantShopUnitRentRevocationActions.createTenantShopUnitRentRevocationRecord({
        createPayload: {
          shopUnitId: shopUnit.id,
          tenantId: tenant.id,
          landlordId: loggedInLandlord.id,
          reason,
          status: 'approved',
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await dbTransaction.commit()

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_REVOKE_TENANT_FROM_SHOP_UNIT_NOTIFICATION_JOB,
        jobPayload: {
          tenantId: tenant.id,
          shopUnitId: shopUnit.id,
          landlordId: loggedInLandlord.id,
        },
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: TENANT_SHOP_RENT_REVOKED_SUCCESSFULLY,
      })
    } catch (RevokeTenantFromShopUnitController) {
      await dbTransaction.rollback()
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
