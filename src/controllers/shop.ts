import type { Request, Response, NextFunction } from 'express'
import type IShopError from '../models/interfaces/response/error/shopError.ts'
import type IAuthError from '../models/interfaces/response/error/authError.ts'

import fs from 'fs'
import path from 'path'
import PDFDocument from 'pdfkit'


import Product from '../models/mongooseModels/product.ts'
import ErrorRes from '../models/errorResponse.ts'
import SuccessRes from '../models/successResponse.ts'
import User from '../models/mongooseModels/user.ts'
import { __srcDirname } from '../utils/path.ts'
import pdfInvoice from '../utils/PDF/pdfInvoice.ts'
import Order from '../models/mongooseModels/order.ts'



export async function getProds(req: Request, res: Response, next: NextFunction) {
    try {
        const prods = await Product.find().lean()
        res.status(200).json(prods)
    } catch (error) {
        next(error)
    }
}

// param = { prodId:string }
export async function getProdById(req: Request, res: Response, next: NextFunction) {
    try {
        const { prodId } = req.params
        const prods = await Product.findOne({ _id: prodId }).lean()
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
        const newOrder = await user!.addOrder()

        const fileName = newOrder._id + '-invoice-' + user?.email + '.pdf'

        res.setHeader('content-type', 'application/pdf')
        res.setHeader('content-disposition', 'attachment; filename=' + fileName)
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');


        const doc = new PDFDocument()

        const now = Date.now(); /* timestamp */        const dt = new Date(now) // datetime

        const dirPath = path.join(__srcDirname, '..', 'savedFiles', String(dt.getFullYear()), String(dt.getMonth()), String(dt.getDate()))
        if (!fs.existsSync(dirPath))
            fs.mkdirSync(dirPath, { recursive: true })


        const filePath = path.join(dirPath, fileName)
        newOrder.invoiceUrl = filePath
        newOrder.invoiceName = fileName
        await newOrder.save()


        const writeStream = fs.createWriteStream(filePath)
        doc.pipe(writeStream); /* --- */    doc.pipe(res)

        pdfInvoice(doc, newOrder)   // create pdf template

        doc.end()

    } catch (error) {
        next(error)
    }
}


// param = { orderId }
export async function getInvoice(req: Request, res: Response, next: NextFunction) {
    try {
        const orderId = req.body['orderId']
        const order = await Order.findById(orderId).lean()
        const filePath = order?.invoiceUrl
        if (!filePath)
            throw new ErrorRes('Not found invoice', 404, { infor: 'please re-create invoice' })

        const readSt = fs.createReadStream(filePath)
        readSt.on('error', error => next(error))
        res.setHeader('content-disposition', 'attachment;filename=' + order.invoiceName)
        readSt.pipe(res)

    } catch (error) {

    }
}

export default {
    getProds, getProdById, getCart, postCart, getOrders, postOrder, getInvoice
}