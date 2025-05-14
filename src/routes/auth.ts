import { Router } from 'express'


import authCtrl from '../controllers/auth.ts'
import { Server_URL as url } from '../utils/uriEnums/Server_Url.ts'
import { isEmail } from '../middlewares/inputValidations.ts'

const router = Router()

// req.body = { email, password }
router.post(url.login, authCtrl.login)

// req.body = { email, password, confirmPassword }
router.post(url.signup, isEmail(), authCtrl.signup)

// req.body = { email }
router.post(url.createResetPassToken, authCtrl.createResetPassToken)

// req.body = {  password, confirmPassword, userId, resetToken }
router.post(url.resetPass, authCtrl.resetPass)


router.get('/test-cookie', authCtrl.testCookie)


export default router