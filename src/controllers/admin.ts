import type { Request, Response, NextFunction } from 'express'

import type IProdErrorRes from '../models/interfaces/response/error/prodErrorResponse.ts';


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
            throw new ErrorRes<IProdErrorRes>('Product \'field input error', 422, createErrorRes(errors))

        const { title, price, imageUrl, description } = req.body

        const prod = new Product({ title, price, imageUrl, description })
        const created = await prod.save()

        res.status(201).json(new SuccessRes(`Product was added with id: ${String(created._id)}`))

    } catch (error) {
        next(error)
    }
}

export function getFindAll(req: Request, res: Response, next: NextFunction) {
    Product.find()
        .then(prods => res.status(200).send(prods))
        .catch(error => { console.error(error); res.status(400).send(error) })
}

export function getFindById(req: Request, res: Response, next: NextFunction) {
    const { prodId } = req.params
    Product.findById(prodId)
        .then(prod => res.send(prod))
        .catch(error => { console.error(error); res.status(400).send(error) })
}

//  req.body = { prodId, title, price, imageUrl, description }
export async function postEditProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            throw new ErrorRes<IProdErrorRes>('Product \'field input error', 422, createErrorRes(errors))

        const { prodId, title, price, imageUrl, description } = req.body;

        if (!prodId)
            throw new ErrorRes<IProdErrorRes>('Edit product failed', 422, { prodId: 'request require \'prodId\' property!' })

        await Product.findByIdAndUpdate(prodId, { title, price, imageUrl, description });
        res.status(200).json(new SuccessRes(`Product with id: ${prodId} was eddited`))

    } catch (error) {
        next(error)
    }
}



//  req.body = { prodId }
export function postDeleteProduct(req: Request, res: Response, next: NextFunction) {
    const { prodId } = req.body
    Product.findByIdAndDelete(prodId)
        // Product.deleteById(prodId)
        //     .then(deleted => {
        //         let result = `Product with id: '${prodId}' was deleted`
        //         if (deleted.deletedCount === 0) {
        //             result = `Not found product with id: '${prodId}' to delete!`
        //             return res.status(404).send(result)
        //         }
        //         
        //     })
        .then(deleted => {
            let result = `Product with id: '${prodId}' was deleted`
            if (!deleted)
                result = `Not found product with id: '${prodId}' to delete!`

            return res.status(404).send(result)
        })
        .catch(error => { console.error(error); res.status(400).send(error) })
}


export default {
    postAddProduct, getFindAll, getFindById, postEditProduct, postDeleteProduct
}