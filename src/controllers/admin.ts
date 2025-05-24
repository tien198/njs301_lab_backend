import type { Request, Response, NextFunction } from 'express'

import type IProdError from '../models/interfaces/response/error/prodError.ts';


import fs from 'fs'

import Product from '../models/mongooseModels/product.ts';
import ErrorRes from '../models/errorResponse.ts';
import SuccessRes from '../models/successResponse.ts';
import User from '../models/mongooseModels/user.ts';
import path from 'path';


//  req.body = { title, price, image: BinaryData, description }
export async function postAddProduct(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.file)
            throw new ErrorRes<IProdError>('Product \'field input error', 422, { image: 'Image is required' })

        const filePath = req.file?.path
        const { title, price, description } = req.body

        const userId = req.session.user?._id

        const prod = new Product({ title, price, imageUrl: filePath, description, userRef: userId })
        const created = await prod.save()

        res.status(201).json(new SuccessRes(`Product was added with id: ${String(created._id)}`))

    } catch (error) {
        next(error)
    }
}

export async function getFindAll(req: Request, res: Response, next: NextFunction) {
    try {

        const prods = await Product.find({ userRef: req.session.user?._id }).lean()
        res.status(200).json(prods)
    } catch (error) {
        next(error)
    }
}

export async function getFindById(req: Request, res: Response, next: NextFunction) {
    try {
        const { prodId } = req.params
        const owner = await User.findOne({ _id: req.session.user?._id }).lean()
        const prod = await Product.findById(prodId)
        if (String(owner?._id) !== String(prod?.userRef))
            throw new ErrorRes<IProdError>('Not found', 404, { notFound: 'The resourse is not available' })

        res.status(200).json(prod)
    } catch (error) {
        next(error)
    }
}

//  req.body = { prodId, title, price, image: BinaryData, description }
export async function postEditProduct(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.file)
            throw new ErrorRes<IProdError>('Product \'field input error', 422, { image: 'Image is required' })

        const filePath = req.file.path
        const { prodId, title, price, description } = req.body;

        if (!prodId)
            throw new ErrorRes<IProdError>('Edit product failed', 422, { prodId: 'request require \'prodId\' property!' })

        await Product.findByIdAndUpdate(prodId, { title, price, imageUrl: filePath, description });
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

        const imgPath = deleted?.imageUrl
        if (fs.existsSync(imgPath))
            fs.unlink(imgPath, (error) => {
                console.log(error)
                console.log(imgPath)
            })
        res.status(200).json(new SuccessRes('Delete success'))
        return

    } catch (error) {
        next(error)
    }
}


export default {
    postAddProduct, getFindAll, getFindById, postEditProduct, postDeleteProduct
}