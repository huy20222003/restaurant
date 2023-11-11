import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//----------------------------------------------------------------

import ReviewsController from '../app/controllers/ReviewsController.mjs';

router.post('/create-review', authVerify, cashbinMiddleware, ReviewsController.createReview);
router.put('/update-order', authVerify, cashbinMiddleware, ReviewsController.updateOrder);
router.get('/:_id', ReviewsController.getAllReviewsByProduct);

export default router;
