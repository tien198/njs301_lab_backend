import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'


import type { HydratedDocument } from 'mongoose'
import type { IProduct } from '../interfaces/base/product.ts'
import type { IUser } from '../interfaces/base/user.ts'
import type { IUserMethod, UserModel } from '../interfaces/mongoose/user.ts'


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
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 }
            }
        ],
        total: {
            type: Number,
            default: 0
        },
    }
}, {
    methods: {
        getCart() {
            return this.populate('cart.items.product')
                .then(user => user.cart)
        },

        addToCart(prod: HydratedDocument<IProduct>, quantity: number) {
            const cart = this.cart
            const item = cart.items?.find(i => {
                if (!i.product)
                    return false
                return i.product.toString() === prod._id.toString()
            })
            if (item)
                item.quantity += +quantity
            else
                cart.items = [
                    ..._.cloneDeep(this.cart.items),
                    {
                        product: prod._id,
                        quantity: +quantity
                    }
                ]

            cart.total += (+prod.price * +quantity)
            return this.updateOne({ cart: cart })
        },

        addOrder() {
            return this.getCart()
                .then(cart => {
                    return Order.create({
                        items: cart.items,
                        total: cart.total,
                        user: {
                            _id: this._id,
                            name: this.name
                        }
                    })
                })
                .then(_ => {
                    this.cart = { items: [], total: 0 }
                    return this.save()
                })
        },

        getOrders() {
            return Order.find({ 'user._id': this._id })
                .then(orders => orders)
        }
    }
})

const User = mongoose.model('User', userSchema)

export default User
