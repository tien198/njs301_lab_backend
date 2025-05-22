import mongoose from 'mongoose'
const { Schema } = mongoose

import Product from './product.ts'

import type { IOrder } from '../interfaces/base/order.ts'
import type { IOrderMethod, OrderModel } from '../interfaces/mongoose/order.ts'


const orderSchema = new Schema<IOrder, OrderModel, IOrderMethod>({
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
    invoiceUrl: String,
    invoiceName: String,

    userRef: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

const Order = mongoose.model('Order', orderSchema)

export default Order