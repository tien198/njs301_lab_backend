import type { Request, Response, NextFunction } from 'express'

import type IProdError from '../models/interfaces/response/error/prodError.ts';


import Product from '../models/mongooseModels/product.ts';
import { validationResult } from 'express-validator';
import ErrorRes from '../models/errorResponse.ts';
import { createErrorRes } from '../utils/exValidator/createErrorRes.ts';
import SuccessRes from '../models/successResponse.ts';


//  req.body = { title, price, imageUrl, description }
export async function postAddProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            throw new ErrorRes<IProdError>('Product \'field input error', 422, createErrorRes(errors))

        const { title, price, imageUrl, description } = req.body

        const prod = new Product({ title, price, imageUrl, description })
        const created = await prod.save()

        res.status(201).json(new SuccessRes(`Product was added with id: ${String(created._id)}`))

    } catch (error) {
        next(error)
    }
}

export async function getFindAll(req: Request, res: Response, next: NextFunction) {
    try {
        const prods = await Product.find()
        res.status(200).send(prods)
    } catch (error) {
        next(error)
    }
}

export async function getFindById(req: Request, res: Response, next: NextFunction) {
    try {
        const { prodId } = req.params
        const prod = await Product.findById(prodId)
        res.status(200).json(prod)
    } catch (error) {
        next(error)
    }
}

//  req.body = { prodId, title, price, imageUrl, description }
export async function postEditProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            throw new ErrorRes<IProdError>('Product \'field input error', 422, createErrorRes(errors))

        const { prodId, title, price, imageUrl, description } = req.body;

        if (!prodId)
            throw new ErrorRes<IProdError>('Edit product failed', 422, { prodId: 'request require \'prodId\' property!' })

        await Product.findByIdAndUpdate(prodId, { title, price, imageUrl, description });
        res.status(200).json(new SuccessRes(`Product with id: ${prodId} was eddited`))

    } catch (error) {
        next(error)
    }
}



//  req.body = { prodId }
export async function postDeleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const { prodId } = req.body
        const deleted = await Product.findByIdAndDelete(prodId)

        if (!deleted)
            throw new ErrorRes<IProdError>('Delete product failed', 404, { notFound: 'The product you want to delete does not exist' })

        return res.status(200).json(new SuccessRes('Delete success'))

    } catch (error) {
        next(error)
    }
}


export default {
    postAddProduct, getFindAll, getFindById, postEditProduct, postDeleteProduct
}