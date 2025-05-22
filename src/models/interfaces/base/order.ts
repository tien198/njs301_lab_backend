import type { ObjectId } from 'mongodb'
import type { IProduct } from './product.ts'

export interface IOrderItem {
    product: IProduct
    quantity: Number
}

export interface IOrder {
    _id: ObjectId
    items: IOrderItem[]
    total: number
    invoiceUrl: string
    invoiceName: string
    userRef: ObjectId
}
