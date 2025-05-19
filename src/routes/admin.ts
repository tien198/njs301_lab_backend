import express, { Router } from 'express'

import adminCtrl from '../controllers/admin.ts'
import { isValidProduct, validateProdMw } from '../middlewares/exValidator/productValidator.ts'
import { Server_URL } from '../utils/uriEnums/Server_Url.ts'
import { multerMw, multerImgMw } from '../middlewares/multerMw.ts'

const router = Router()

router.use(multerMw)

router.use(express.urlencoded({ extended: true }))

router.get(Server_URL.products, adminCtrl.getFindAll)

router.get(Server_URL.product + '/:prodId', adminCtrl.getFindById)

//  req.body = { title, price, image: binaryData, description }
router.post(Server_URL.addProduct, isValidProduct, validateProdMw, multerImgMw, adminCtrl.postAddProduct);

//  req.body = { prodId, title, price, image: binaryData, description }
router.post(Server_URL.editProduct, isValidProduct, validateProdMw, multerImgMw, adminCtrl.postEditProduct);

//  req.body = { prodId }
router.post(Server_URL.deleteProduct, adminCtrl.postDeleteProduct)

export default router