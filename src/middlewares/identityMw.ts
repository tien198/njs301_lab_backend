import type { Request, Response, NextFunction } from 'express'
import type IAuthError from '../models/interfaces/response/error/authError.ts'

import ErrorRes from '../models/errorResponse.ts'



export function isAuthenMw(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
        next()
        return
    }

    const error = new ErrorRes<IAuthError>('Unauthorize', 403, { credential: 'Please login to use this function' })
    next(error)
}

export function isAuthorizeMw(req: Request, res: Response, next: NextFunction) {
    if (req.session.user?.isAdmin) {
        next()
        return
    }

    const error = new ErrorRes<IAuthError>('Unauthorize', 403, { credential: 'User does not have permission to this resourse' })
    next(error)
}