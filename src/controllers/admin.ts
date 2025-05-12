import type { Request, Response, NextFunction } from 'express'


import { error } from 'console';
import Product from '../models/mongooseModels/product.ts';



export function postAddProduct(req: Request, res: Response, next: NextFunction) {
    const { title, price, imageUrl, description } = req.body
    const prod = new Product({ title, price, imageUrl, description })
    prod.save()
        .then(() => res.status(201).send('add-product complete!'))
        .catch(err => { error(err); res.status(400).send(err) })
}

export function getFindAll(req: Request, res: Response, next: NextFunction) {
    Product.find()
        .then(prods => res.status(200).send(prods))
        .catch(err => { error(err); res.status(400).send(err) })
}

export function getFindById(req: Request, res: Response, next: NextFunction) {
    const { prodId } = req.params
    Product.findById(prodId)
        .then(prod => res.send(prod))
        .catch(err => { error(err); res.status(400).send(err) })
}

export async function postEditProduct(req: Request, res: Response, next: NextFunction) {
    const { prodId, title, price, imageUrl, description } = req.body;

    if (!prodId) {
        res.status(400).send(`'/admin/edit-product' request require 'prodId' property!`);
        return
    }

    try {
        await Product.findByIdAndUpdate(prodId, { title, price, imageUrl, description });
        res.status(200).send(`updated successfully, product with id: '${prodId}'`);
    } catch (err) {
        error(err);
        res.status(400).send(err);
    }
}




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
        .catch(err => { error(err); res.status(400).send(err) })
}


export default {
    postAddProduct, getFindAll, getFindById, postEditProduct, postDeleteProduct
}