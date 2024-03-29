import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import HouseUnitActions from 'App/Actions/HouseUnitActions'
import TenantActions from 'App/Actions/TenantActions'
import TenantHouseUnitRentActions from 'App/Actions/TenantHouseUnitRentActions'
import {
  ERROR,
  HOUSE_UNIT_ALREADY_EMPTY,
  HOUSE_UNIT_NOT_ASSIGNED_TO_TENANT,
  HOUSE_UNIT_NOT_FOUND,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  TENANT_ACCOUNT_NOT_FOUND,
  TENANT_HOUSE_RENT_REVOKED_SUCCESSFULLY,
} from 'App/Helpers/Messages/SystemMessage'
import QueueClient from 'App/InfrastructureProviders/Internals/QueueClient'
import HttpStatusCodeEnum from 'App/Typechecking/Enums/HttpStatusCodeEnum'
import { SEND_REVOKE_TENANT_FROM_HOUSE_UNIT_NOTIFICATION_JOB } from 'App/Typechecking/JobManagement/NotificationJobTypes'

export default class RevokeTenantFromHouseUnitController {
  private internalServerError = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
  private notFound = HttpStatusCodeEnum.NOT_FOUND
  private ok = HttpStatusCodeEnum.OK
  private badRequest = HttpStatusCodeEnum.BAD_REQUEST

  public async handle({ request, auth, response }: HttpContextContract) {
    const dbTransaction = await Database.transaction()
    try {
      const { houseUnitIdentifier, tenantIdentifier } = request.params()

      const loggedInLandlord = auth.use('landlord').user!

      const houseUnit = await HouseUnitActions.getHouseUnitRecord({
        identifierType: 'identifier',
        identifier: houseUnitIdentifier,
      })

      if (houseUnit === NULL_OBJECT) {
        await dbTransaction.rollback()
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: HOUSE_UNIT_NOT_FOUND,
        })
      }

      if (houseUnit.house.landlordId !== loggedInLandlord.id) {
        await dbTransaction.rollback()
        return response.notFound({
          status: ERROR,
          status_code: this.notFound,
          message: HOUSE_UNIT_NOT_FOUND,
        })
      }

      if (houseUnit.occupationStatus === 'empty') {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: HOUSE_UNIT_ALREADY_EMPTY,
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

      const tenantHouseUnitRent = await TenantHouseUnitRentActions.getTenantHouseUnitRentDistinct({
        tenantId: tenant.id,
        houseUnitId: houseUnit.id,
        landlordId: loggedInLandlord.id,
      })

      if (tenantHouseUnitRent === NULL_OBJECT) {
        await dbTransaction.rollback()
        return response.badRequest({
          status: ERROR,
          status_code: this.badRequest,
          message: HOUSE_UNIT_NOT_ASSIGNED_TO_TENANT,
        })
      }

      await TenantHouseUnitRentActions.updateTenantHouseUnitRentRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: tenantHouseUnitRent.id,
        },
        updatePayload: {
          houseUnitId: houseUnit.id,
          tenantId: tenant.id,
          houseRentAmount: houseUnit.baseRentAmount,
          rentStatus: 'inactive',
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await HouseUnitActions.updateHouseUnitRecord({
        identifierOptions: {
          identifierType: 'id',
          identifier: houseUnit.id,
        },
        updatePayload: {
          occupationStatus: 'empty',
        },
        dbTransactionOptions: {
          useTransaction: true,
          dbTransaction,
        },
      })

      await dbTransaction.commit()

      await QueueClient.addJobToQueue({
        jobIdentifier: SEND_REVOKE_TENANT_FROM_HOUSE_UNIT_NOTIFICATION_JOB,
        jobPayload: {
          tenantId: tenant.id,
          houseUnitId: houseUnit.id,
        },
      })

      return response.ok({
        status: SUCCESS,
        status_code: this.ok,
        message: TENANT_HOUSE_RENT_REVOKED_SUCCESSFULLY,
      })
    } catch (RevokeTenantFromHouseUnitControllerError) {
      await dbTransaction.rollback()
      return response.internalServerError({
        status: ERROR,
        status_code: this.internalServerError,
        message: SOMETHING_WENT_WRONG,
      })
    }
  }
}
