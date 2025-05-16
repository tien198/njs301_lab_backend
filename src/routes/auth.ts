import { Router } from 'express'


import authCtrl from '../controllers/auth.ts'
import { Server_URL as url } from '../utils/uriEnums/Server_Url.ts'
import { isValidEmai, isValidLogin, isValidResetPass, isValidSignup } from '../middlewares/exValidator/authValidator.ts'

const router = Router()

// req.body = { email, password }
router.post(url.login, isValidLogin(), authCtrl.login)

// req.body = { email, password, confirmPassword }
router.post(url.signup, isValidSignup(), authCtrl.signup)

// req.body = { email }
router.post(url.createResetPassToken, isValidEmai(), authCtrl.createResetPassToken)

// req.body = {  password, confirmPassword, userId, resetToken }
router.post(url.resetPass, isValidResetPass(), authCtrl.resetPass)


router.get('/test-cookie', authCtrl.testCookie)


export default router