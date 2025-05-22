import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'


import type { HydratedDocument } from 'mongoose'
import type { IProduct } from '../interfaces/base/product.ts'
import type { IUser } from '../interfaces/base/user.ts'
import type { IUserMethod, UserModel } from '../interfaces/mongoose/user.ts'
import type { IOrderItem } from '../interfaces/base/order.ts'


import Order from './order.ts'



const userSchema = new Schema<IUser, UserModel, IUserMethod>({
    name: String,
    email: { type: String, require: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [
            {
                productRef: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 }
            }
        ],
        total: { type: Number, default: 0 },
    },
    isAdmin: { type: Boolean, default: false }
}, {
    methods: {
        async getCart() {
            return (await this.populate('cart.items.productRef')).cart
        },

        addToCart(prod: HydratedDocument<IProduct>, quantity: number) {
            const cart = this.cart
            const item = cart.items?.find(i => {
                if (!i.productRef)
                    return false
                return i.productRef.toString() === prod._id.toString()
            })
            if (item)
                item.quantity += +quantity
            else
                cart.items = [
                    ..._.cloneDeep(this.cart.items),
                    {
                        productRef: prod._id,
                        quantity: +quantity
                    }
                ]

            cart.total += (+prod.price * +quantity)
            return this.updateOne({ cart: cart })
        },

        async addOrder() {
            const cart = await this.getCart()
            const items: IOrderItem[] = cart.items.map(i => ({
                quantity: i.quantity,
                product: { ...(i.productRef as any).toObject() }
            }))

            const newOrder = await Order.create({
                items: items,
                total: cart.total,
                userRef: this._id,
            })
            this.cart = { items: [], total: 0 }
            await this.save()
            return newOrder
        },

        async getOrders() {
            return await Order.find({ 'userRef': this._id })
        }
    }
})

const User = mongoose.model('User', userSchema)

export default User
