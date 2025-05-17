import { check, body } from 'express-validator'

//  req.body = { title, price, imageUrl, description }
export const isValidProduct = () => [
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

    body('imageUrl')
        .trim()
        .notEmpty().withMessage('ImageUrl is required').bail()
        .isURL().withMessage('ImageUrl must be an url'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required').bail()
        .isLength({ min: 5 }).withMessage('Description must have at least 5 character')
]