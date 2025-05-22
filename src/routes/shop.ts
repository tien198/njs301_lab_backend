import express, { Router } from 'express'

import shopCtrl from '../controllers/shop.ts'
import { Server_URL } from '../utils/uriEnums/Server_Url.ts'
import { isAuthenMw } from '../middlewares/identityMw.ts'



const router = Router()
router.use(express.urlencoded({ extended: false }))



router.get(Server_URL.base, shopCtrl.getProds)

// param = { prodId:string }
router.get(Server_URL.product + '/:prodId', shopCtrl.getProdById)


router.use(isAuthenMw)

router.get(Server_URL.cart, shopCtrl.getCart)
router.post(Server_URL.addToCart, shopCtrl.postCart)

router.get(Server_URL.order, shopCtrl.getOrders)
router.post(Server_URL.addOrder, shopCtrl.postOrder)

router.post(Server_URL.getInvoice, shopCtrl.getInvoice)

export default router