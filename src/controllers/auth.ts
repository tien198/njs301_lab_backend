import type { Request, Response, NextFunction } from 'express'
import type IAuthError from '../models/auth/authError.interface.ts'


import User from '../models/mongooseModels/user.ts'
import bcrypt from 'bcryptjs'
import ErrorRes from '../models/errorResponse.ts'



// req.body = { email, password }
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).lean()
        if (!user)
            throw new ErrorRes('Login failed!', 400, { uncredentialed: 'User or password is not correct!' })
        const isValid = await bcrypt.compare(password, user?.password)
        if (isValid) {
            req.session.user = user
            req.session.save()
            res.status(200).json('log in success !')
        }
        else {
            throw new ErrorRes('Login failed!', 400, { uncredentialed: 'User or password is not correct!' })
        }
    } catch (error) {
        next(error)
    }
}


// req.body = { email, password, confirmPassword }
export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, confirmPassword } = req.body

        const user = await User.findOne({ email }).lean()

        if (user)
            throw new ErrorRes<IAuthError>('Creating user failed!', 400, { wasExist: 'user is existed' })

        if (password !== confirmPassword)
            throw new ErrorRes<IAuthError>('Creating user failed!', 400, { confirmPass: 'confirm password is not same to password' })

        const hashed = bcrypt.hashSync(password, 12)

        const created = await User.create({
            email: email, password: hashed
        })
        req.session.user = created
        req.session.save()
        res.status(201).json(created)

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

export default { login, signup, testCookie }