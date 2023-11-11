import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//----------------------------------------------------------------

import PaymentController from '../app/controllers/PaymentController.mjs';

router.post('/create-payment-vnpay', authVerify, cashbinMiddleware, PaymentController.createPaymentVNPay);
router.get('/vnpay-ipn', PaymentController.vnpayIPN, PaymentController.donePayment);
router.put('/update-payment/:_id', PaymentController.updatePayment);
router.get('/:_id', authVerify, cashbinMiddleware, PaymentController.getOnePayment);
router.get('/', authVerify, cashbinMiddleware, PaymentController.getAllPayments);
router.post('/create-payment', authVerify, cashbinMiddleware, PaymentController.createPayment);
router.get('/vnpay-return', authVerify, cashbinMiddleware, PaymentController.vnpayReturn);

export default router;
