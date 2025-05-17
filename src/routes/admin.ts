import { Router } from 'express'

import adminCtrl from '../controllers/admin.ts'
import { isValidProduct } from '../middlewares/exValidator/productValidator.ts'
import { Server_URL } from '../utils/uriEnums/Server_Url.ts'

const router = Router()


router.get(Server_URL.products, adminCtrl.getFindAll)

router.get(Server_URL.product + '/:prodId', adminCtrl.getFindById)

//  req.body = { title, price, imageUrl, description }
router.post(Server_URL.addProduct, isValidProduct(), adminCtrl.postAddProduct);

//  req.body = { prodId, title, price, imageUrl, description }
router.post(Server_URL.editProduct, isValidProduct(), adminCtrl.postEditProduct);

//  req.body = { prodId }
router.post(Server_URL.deleteProduct, adminCtrl.postDeleteProduct)

export default router