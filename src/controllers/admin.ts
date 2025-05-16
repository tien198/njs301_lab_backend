import type { Request, Response, NextFunction } from 'express'


import Product from '../models/mongooseModels/product.ts';


//  req.body = { title, price, imageUrl, description }
export async function postAddProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, price, imageUrl, description } = req.body

        //_________________________________ continoun !

        const prod = new Product({ title, price, imageUrl, description })
        const created = await prod.save()
        res.status(201).send(`Product was added with id: ${String(created._id)}`)
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
    const { prodId, title, price, imageUrl, description } = req.body;

    if (!prodId) {
        res.status(400).send(`'/admin/edit-product' request require 'prodId' property!`);
        return
    }

    try {
        await Product.findByIdAndUpdate(prodId, { title, price, imageUrl, description });
        res.status(200).send(`updated successfully, product with id: '${prodId}'`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
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