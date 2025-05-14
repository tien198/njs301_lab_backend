import { Router } from 'express'

import authCtrl from '../controllers/auth.ts'
import { Server_URL } from '../utils/uriEnums/Server_Url.ts'

const router = Router()

// req.body = { email, password }
router.post('/login', authCtrl.login)

// req.body = { email, password, confirmPassword }
router.post('/sign-up', authCtrl.signup)

// req.body = { email }
router.post(Server_URL.createResetPassToken, authCtrl.createResetPassToken)

// req.body = {  password, confirmPassword, userId, resetToken }
router.post(Server_URL.resetPass, authCtrl.resetPass)


router.get('/test-cookie', authCtrl.testCookie)


export default router