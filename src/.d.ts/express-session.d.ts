import 'express-session'
import type IUser from '../models/interfaces/user.ts'

declare module 'express-session' {
    interface SessionData {
        user: IUser;
    }
}