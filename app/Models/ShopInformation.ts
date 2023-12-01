import { column } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'

export default class ShopInformation extends AbstractModel {
    @column()
    public shopId: number

    @column()
    public stateId: number

    @column()
    public lgaId: number

    @column()
    public area: string

    @column()
    public nearestLandmark: string

    @column()
    public longitude: string

    @column()
    public latitude: string

    @column()
    public length: number

    @column()
    public breadth: number

    @column()
    public baseAmount: number

    @column()
    public minimumAmount: number

    @column()
    public maximumAmount: number

    @column()
    public possibleUseCases: string
}
