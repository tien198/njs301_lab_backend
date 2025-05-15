import { check, body } from 'express-validator'

export const isValidSignup = () => [
    check('email')
        .normalizeEmail({ all_lowercase: true })
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value: string, metaData) => {
            console.log('_' + value + '_')

            if (!value.includes('@app.gmail.com'))
                throw new Error("This email must have format '.app@gmail.com'")
            return Promise.resolve()
        }),

    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
        .trim()
        .isLength({ min: 5 })
        .isAlphanumeric(),

    body('confirmPassword')
        .trim()
        .custom((val, { req }) => {
            if (val !== req.body.password)
                throw new Error("'confirmPassword' does not match to 'password'")
            return true
        })
]