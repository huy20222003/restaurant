import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//----------------------------------------------------------------


import CartsController from '../app/controllers/CartsController.mjs';

router.get('/', authVerify, cashbinMiddleware,  CartsController.getUserCart);
router.put('/update-cart', authVerify, cashbinMiddleware, CartsController.updateCart);
router.put('/update-cart-quantity', authVerify, cashbinMiddleware, CartsController.updateQuantity);
router.delete('/update-cart/delete-product/:_id', authVerify, cashbinMiddleware, CartsController.deleteProductFromCart);

export default router;
