import type { Request, Response, NextFunction } from 'express'
import type IAuthError from '../models/interfaces/response/error/authErrorResponse.ts'
import type IAuthErrorRes from '../models/interfaces/response/error/authErrorResponse.ts'


import crypto from 'crypto'
import User from '../models/mongooseModels/user.ts'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'


import ErrorRes from '../models/errorResponse.ts'
import { sendMail } from '../utils/sendMail.ts'
import { resetPassTemplate } from '../utils/mailTemplate.ts'
import { createErrorRes } from '../utils/exValidator/createErrorRes.ts'
import SuccessRes from '../models/successResponse.ts'



// req.body = { email, password }
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorObj = createErrorRes(errors)
            throw new ErrorRes('Login failed!', 422, errorObj)
        }

        const user = await User.findOne({ email }).lean()
        if (!user)
            throw new ErrorRes<IAuthError>('Login failed!', 400, { credential: 'User or password is not correct!' })

        const isValid = await bcrypt.compare(password, user?.password)
        if (isValid) {
            req.session.user = user
            req.session.save()
            res.status(200).json(new SuccessRes('login success!'))
        }
        else {
            throw new ErrorRes<IAuthError>('Login failed!', 400, { credential: 'User or password is not correct!' })
        }
    } catch (error) {
        next(error)
    }
}



// req.body = { email, password, confirmPassword }
export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, confirmPassword } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorObj = createErrorRes(errors)
            throw new ErrorRes('Creating user failed!', 422, errorObj)
        }

        const hashed = bcrypt.hashSync(password, +process.env.SALT_LENGTH!)

        const created = await User.create({
            email: email, password: hashed
        })
        req.session.user = created
        req.session.save()
        // sendmail is async
        sendMail('tienvn998@gmail.com', 'Signup successfully!')
        res.status(201).json(created)

    } catch (error) {
        next(error)
    }
}


// req.body = { email }
export async function createResetPassToken(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            throw new ErrorRes<IAuthErrorRes>('Fail to create reset pass token', 422, createErrorRes(errors))

        const buffer = crypto.randomBytes(32)
        const token = buffer.toString('hex')
        const user = await User.findOne({ email: req.body.email })

        if (!user)
            throw new ErrorRes('Error when reset password', 404, { infor: 'No account with that email found!' })

        // resetToken include token.userId seperate by a dot notation
        user.resetToken = token + '.' + String(user._id)
        user.resetTokenExpiration = new Date(Date.now() + 3600000)

        const updated = await user.save()

        res.status(200).json(new SuccessRes('Reset pass token was generated! Please check your email and click the link inside to reset password!'))
        sendMail(updated.email, 'Password reset', '', resetPassTemplate(updated.resetToken!))

    } catch (error) {
        next(error)
    }
}


// req.body = {  password, confirmPassword, resetToken }
export async function resetPass(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            throw new ErrorRes<IAuthErrorRes>('Fail to create reset pass token', 422, createErrorRes(errors))

        // confirmPassword was validated in express-validator middleware
        const { password, confirmPassword, resetToken } = req.body

        // resetToken include token.userId seperate by a dot notation        
        const userId = resetToken.split('.')[1]
        const user = await User.findById(userId)

        if ((!user) || (resetToken !== user.resetToken))
            throw new ErrorRes<IAuthError>('Error when reset password', 422, { credential: 'Reset token invalid' })

        if (Date.now() > user.resetTokenExpiration?.getTime()!)
            throw new ErrorRes<IAuthError>('Error when reset password', 422, { credential: 'Reset token expired' })

        user.password = bcrypt.hashSync(password, +process.env.SALT_LENGTH!)
        user.resetToken = undefined
        user.resetTokenExpiration = undefined

        const updated = await user.save()

        res.status(200).json(new SuccessRes('Reset pass token was generated! Please check your email and click the link inside to reset password!'))
        sendMail(updated.email, 'Password was reseted', '', '<h1>Password was reseted!</h1>')

    } catch (error) {
        next(error)
    }
}



export function testCookie(req: Request, res: Response, next: NextFunction) {
    const user = req.session.user
    if (user)
        res.status(200).json(user)
    else
        res.status(200).json('unauthorize')
}

export default { login, signup, createResetPassToken, resetPass, testCookie }