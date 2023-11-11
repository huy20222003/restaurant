import express from 'express';
import OrdersController from '../app/controllers/OrdersController.mjs';
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//----------------------------------------------------------------

const router = express.Router();

router.patch('/update-order/:_id', authVerify, cashbinMiddleware, OrdersController.updateOrder);
router.get('/filter-order', OrdersController.filterOrderByStatus);
router.put('/update-cart', authVerify, cashbinMiddleware, OrdersController.updateCartAfterOrder);
router.get('/getAllById', authVerify, cashbinMiddleware, OrdersController.getAllOrdersById);
router.get('/', authVerify, cashbinMiddleware, OrdersController.getAllOrders);
router.get('/:_id', authVerify, cashbinMiddleware, OrdersController.getSingleOrder);
router.post('/create-order', authVerify, cashbinMiddleware, OrdersController.createOrder);


export default router;
