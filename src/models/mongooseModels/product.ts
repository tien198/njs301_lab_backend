import mongoose, { Schema } from 'mongoose'

import type { IProduct } from '../interfaces/base/product.ts'



const productSchema = new Schema<IProduct>({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    imageUrl: { type: String, require: true },
    description: { type: String, require: true },
    userRef: { type: Schema.Types.ObjectId, ref: 'User', require: true }
})

const Product = mongoose.model('Product', productSchema)

export default Product