import type { Request, Response, NextFunction } from 'express'
import type IShopError from '../models/interfaces/response/error/shopError.ts'
import type IAuthError from '../models/interfaces/response/error/authError.ts'



import Product from '../models/mongooseModels/product.ts'
import ErrorRes from '../models/errorResponse.ts'
import SuccessRes from '../models/successResponse.ts'
import User from '../models/mongooseModels/user.ts'



export async function getProds(req: Request, res: Response, next: NextFunction) {
    try {
        const prods = await Product.find().lean()
        res.status(200).json(prods)
    } catch (error) {
        next(error)
    }
}

export async function getCart(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findById(req.session.user?._id.toString())
        if (!user)
            throw new ErrorRes<IAuthError>('Get cart failed', 403, { credential: 'Not permision. please login' })

        const cart = await user!.getCart()
        if (!cart)
            throw new ErrorRes<IShopError>('Get cart failed', 404, { notFoundCart: 'Cart haven\'t been initialized, please add to cart to init' })

        res.status(200).json(cart)

    } catch (error) {
        next(error)
    }
}

export async function postCart(req: Request, res: Response, next: NextFunction) {
    try {
        const { prodId } = req.body
        const user = await User.findById(req.session.user?._id)

        const prod = await Product.findById(prodId)
        if (!prod)
            throw Error(`Not found product with id: ${prodId}`)

        await user!.addToCart(prod, 1)

        res.status(200).json(new SuccessRes(`Added to cart product with id: ${prodId}`))

    } catch (error) {
        next(error)
    }

}

export async function getOrders(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findOne({ _id: req.session.user?._id })
        const orders = await user!.getOrders()

        res.status(200).json(orders)

    } catch (error) {
        next(error)
    }
}

// userId is found in session
export async function postOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findOne(req.session.user?._id)
        await user!.addOrder()

        res.status(200).json(new SuccessRes(`Add order successfully! cart'll be reseted!`))

    } catch (error) {
        next(error)
    }
}


export default {
    getProds, getCart, postCart, getOrders, postOrder
}