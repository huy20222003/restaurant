import express from 'express';
import ReservationsController from '../app/controllers/ReservationsController.mjs';
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//----------------------------------------------------------------

const router = express.Router();

router.post('/create-reservation', authVerify, cashbinMiddleware,  ReservationsController.createReservation);
router.post('/filter-reservation', authVerify, cashbinMiddleware,  ReservationsController.filterReservation);
router.get('/', authVerify, cashbinMiddleware, ReservationsController.getAllReservations);
router.get('/get-by-id', authVerify, cashbinMiddleware, ReservationsController.getAllReservationsById);

export default router;
