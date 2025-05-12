import { Router } from 'express'

import adminCtrl from '../controllers/admin.ts'
import Product from '../models/mongooseModels/product.ts'

const router = Router()

router.get('/products', adminCtrl.getFindAll)
router.get('/product/:prodId', adminCtrl.getFindById)
router.post('/add-product', adminCtrl.postAddProduct);
router.post('/edit-product', adminCtrl.postEditProduct);
router.post('/delete-product', adminCtrl.postDeleteProduct)

export default router