import 'express'

import type IUser from '../models/interfaces/user.ts'


declare module 'express'{
    interface Request {
        user?:IUser
    }
}