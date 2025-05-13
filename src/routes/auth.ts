import { Router } from 'express'

import authCtrl from '../controllers/auth.ts'

const router = Router()

// req.body = { email, password }
router.post('/login', authCtrl.login)

// req.body = { email, password, confirmPassword }
router.post('/sign-up', authCtrl.signup)

// req.body = { email }
router.post('/reset-pass', authCtrl.resetPass)

router.get('/test-cookie', authCtrl.testCookie)


export default router