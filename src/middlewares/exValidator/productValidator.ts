import { check, body } from 'express-validator'

//  req.body = { title, price, imageUrl, description }
export const isValidProduct = () => [
    body('prodId')
        .trim(),
    body('title')
        .trim()
        .isAlphanumeric()
        .isLength({ min: 3 })
        .withMessage('Title should contain special character and at least 3 characters'),
    body('price')
        .trim()
        .isNumeric(),
    body('imageUrl')
        .trim()
        .isURL(),
    body('description')
        .trim()
        .isLength({ min: 5 })
]