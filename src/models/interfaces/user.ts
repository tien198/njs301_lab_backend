import type { Document, ObjectId, UpdateResult } from 'mongoose'
import type IProduct from './product.ts'
import type IOrder from './order.ts'

export interface ICartItem {
    product: ObjectId
    quantity: number
}

interface ICart {
    items: ICartItem[],
    total: number
}

export interface IUserInfor {
    name: string
    email: string
    password: string
    cart: ICart
}

export default interface IUser extends Document, IUserInfor {
    getCart(): Promise<ICart>
    addToCart(prod: IProduct, quantity: number): Promise<Document<IUser>>
    addOrder(): Promise<Document<IUser>>
    getOrders(): Promise<IOrder>
}