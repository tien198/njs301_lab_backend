import type { ObjectId } from 'mongodb'
import type { IProduct } from './product.ts'

interface IOrderItem {
    product: IProduct
    quantity: Number
}

export interface IOrder {
    _id: ObjectId
    items: IOrderItem[]
    total: number
    user: {}
}
