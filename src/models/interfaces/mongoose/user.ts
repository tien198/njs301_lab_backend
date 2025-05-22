import type { FlatRecord, HydratedDocument, Model } from 'mongoose'

import type { IOrder } from '../base/order.ts'
import type { IProduct } from '../base/product.ts'
import type { ICart, IUser } from '../base/user.ts'



export interface IUserMethod {
    getCart(): Promise<ICart>
    addToCart(prod: HydratedDocument<IProduct>, quantity: number): Promise<HydratedDocument<IUser>>
    addOrder(): Promise<HydratedDocument<IOrder>>
    getOrders(): Promise<IOrder[]>
}

export interface UserModel extends Model<IUser, {}, IUserMethod> { }
