import { HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import AbstractModel from 'App/Models/AbstractModel'
import ShopInformation from 'App/Models/ShopInformation'

export default class Shop extends AbstractModel {
    @column()
    public landlordId: number

    @column()
    public description: string

    @column({
        consume: (value) => value === 1 ? 'Yes': 'No'
    })
    public canViewInPublic: boolean | string

    @hasOne(() => ShopInformation)
    public information: HasOne<typeof ShopInformation> 
}
