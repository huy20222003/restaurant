import express from 'express';
import ProductsController from '../app/controllers/ProductsController.mjs';
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//----------------------------------------------------------------

const router = express.Router();

router.post('/create-product', authVerify, cashbinMiddleware,  ProductsController.addProduct);
router.put('/update-product/:_id', authVerify, cashbinMiddleware, ProductsController.updateProduct);
router.delete('/delete-product/:_id', authVerify, cashbinMiddleware, ProductsController.deleteProduct);

router.get('/search-product', ProductsController.searchProduct);
router.get('/', ProductsController.getAllProducts);
router.get('/:_id', ProductsController.getSingleProduct);

export default router;
