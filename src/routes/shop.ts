import { Router } from 'express'

import shopCtrl from '../controllers/shop.ts'

const router = Router()
router.get('/', shopCtrl.getProds)

router.get('/cart', shopCtrl.getCart)
router.post('/cart', shopCtrl.postCart)

router.get('/orders', shopCtrl.getOrders)
router.post('/order', shopCtrl.postOrder)

export default router