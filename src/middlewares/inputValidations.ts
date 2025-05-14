import type { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'

export const isEmail = () => check('email')
    .isEmail()
    .withMessage('Please enter a valid email')