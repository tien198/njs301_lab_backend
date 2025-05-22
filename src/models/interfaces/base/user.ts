import type { ObjectId } from 'mongodb'



export interface ICartItem {
    productRef: ObjectId
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
