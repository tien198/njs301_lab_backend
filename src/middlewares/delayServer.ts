import type { Request, Response, NextFunction } from 'express'

export default function delay(req: Request, res: Response, next: NextFunction) {
    setTimeout(() => {
        next()
    }, 3000);
}