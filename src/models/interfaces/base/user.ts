import type { ObjectId } from 'mongodb'
import type { Document, HydratedDocument } from 'mongoose'
import type { IProduct } from './product.ts'



export interface ICartItem {
    productRef: ObjectId | HydratedDocument<IProduct>
    quantity: number
}

export interface ICart {
    items: ICartItem[],
    total: number
}

export interface IUser {
    _id: ObjectId
    name: string
    email: string
    password: string
    cart: ICart
    resetToken?: string
    resetTokenExpiration?: Date
    isAdmin: boolean
}
