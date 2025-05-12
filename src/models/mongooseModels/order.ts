import mongoose, { Model } from 'mongoose'
const { Schema } = mongoose

import Product from './product.ts'

import type IOrder from '../interfaces/order.ts'


const orderSchema = new Schema<IOrder>({
    items: [
        {
            product: {
                _id: Schema.Types.ObjectId,
                ...Product.schema.obj
            },
            quantity: Number
        }
    ],
    total: Number,

    user: {
        _id: Schema.Types.ObjectId,
        name: String
    }
})

const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order