import { check, body } from 'express-validator'

//  req.body = { title, price, imageUrl, description }
export const isValidProduct = () => [
    body('prodId')
        .trim(),
    body('title')
        .trim()
        .isAlphanumeric()
        .isLength({ min: 3 }),
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