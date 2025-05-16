import { check, body } from 'express-validator'
import User from '../../models/mongooseModels/user.ts'

export const isValidSignup = () => [
    check('email')
        .trim()
        .notEmpty().withMessage('Please enter email').bail()
        .normalizeEmail({ all_lowercase: true })
        .isEmail().withMessage('Please enter a valid email').bail()
        .custom((val: string, metaData) => {
            // return Resove if valid. Otherwise, return Reject
            return User.findOne({ email: val }).lean()
                .then(user => {
                    if (user)
                        throw new Error('user was existed')
                })
        }),

    body('password')
        .trim()
        .notEmpty().withMessage('Please enter password').bail()
        .isLength({ min: 5 }).withMessage('Please enter a password with only numbers and text and at least 5 characters.')
        .isAlphanumeric().withMessage('Please enter a password with only numbers and text and at least 5 characters.'),

    body('confirmPassword')
        .trim()
        .notEmpty().withMessage('Please enter confirm password').bail()
        .custom((val, { req }) => {
            if (val !== req.body.password)
                throw new Error("'confirmPassword' does not match to 'password'")
            return true
        })
]

export const isValidLogin = () => [
    check('email')
        .trim()
        .notEmpty().withMessage('Please enter email').bail()
        .normalizeEmail({ all_lowercase: true }),

    body('password')
        .trim()
        .notEmpty().withMessage('Please enter password').bail()
]

export const isValidResetPass = () => [
    body('password')
        .trim()
        .notEmpty().withMessage('Please enter password').bail()
        .isLength({ min: 5 }).withMessage('Please enter a password with only numbers and text and at least 5 characters.')
        .isAlphanumeric().withMessage('Please enter a password with only numbers and text and at least 5 characters.'),

    body('confirmPassword')
        .trim()
        .notEmpty().withMessage('Please enter confirm password').bail()
        .custom((val, { req }) => {
            if (val !== req.body.password)
                throw new Error("'confirmPassword' does not match to 'password'")
            return true
        })
]




// ________  single property validate middlewares

export const isValidEmai = () =>
    check('email')
        .trim()
        .notEmpty().withMessage('Please enter email').bail()
        .normalizeEmail({ all_lowercase: true })
        .isEmail().withMessage('Please enter a valid email').bail()