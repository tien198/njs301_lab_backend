import { Router } from 'express'

import adminCtrl from '../controllers/admin.ts'
import { isValidProduct } from '../middlewares/exValidator/productValidator.ts'

const router = Router()

router.get('/products', adminCtrl.getFindAll)
router.get('/product/:prodId', adminCtrl.getFindById)

//  req.body = { title, price, imageUrl, description }
router.post('/add-product', isValidProduct(), adminCtrl.postAddProduct);

//  req.body = { prodId, title, price, imageUrl, description }
router.post('/edit-product', isValidProduct(), adminCtrl.postEditProduct);

//  req.body = { prodId }
router.post('/delete-product', adminCtrl.postDeleteProduct)

export default router