import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//controller
import TableController from '../app/controllers/TableController.mjs';
//-----------------------------------------------------------

router.post('/create-table', authVerify, cashbinMiddleware, TableController.createTable);
router.put('/update-table/:_id', authVerify, cashbinMiddleware, TableController.updateTable);
router.delete('/delete-table/:_id', authVerify, cashbinMiddleware, TableController.deleteTable);
router.get('/', TableController.getAllTables);
router.get('/:_id', TableController.getSingleTable);


export default router;
