import type { Request, Response, NextFunction } from 'express'
import type IProdError from '../../models/interfaces/response/error/prodError.ts'

import { check, body, validationResult } from 'express-validator'
import ErrorRes from '../../models/errorResponse.ts'
import { createErrorRes } from '../../utils/exValidator/createErrorRes.ts'

//  req.body = { title, price, imageUrl, description }
export const isValidProduct = [
    body('prodId')
        .trim(),

    body('title')
        .trim()
        .notEmpty().withMessage('Title is required').bail()
        .isLength({ min: 3 }).withMessage('Title must at least 3 characters'),

    body('price')
        .trim()
        .notEmpty().withMessage('Price is required').bail()
        .isNumeric().withMessage('Price must be a numeric'),

    // body('imageUrl')
    //     .trim()
    //     .notEmpty().withMessage('ImageUrl is required').bail()
    //     .isURL().withMessage('ImageUrl must be an url'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required').bail()
        .isLength({ min: 5 }).withMessage('Description must have at least 5 character')
]


export function validateProdMw(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            throw new ErrorRes<IProdError>('Product \'field input error', 422, createErrorRes(errors))

        next()

    } catch (error) {
        next(error)
    }
}