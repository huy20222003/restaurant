import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//controller
import RoleController from '../app/controllers/RoleController.mjs';
//-----------------------------------------------------------

router.get('/', authVerify, cashbinMiddleware, RoleController.getAllRole);
router.post('/create-role', authVerify, cashbinMiddleware, RoleController.addRole);
router.patch('/update-role', authVerify, cashbinMiddleware, RoleController.updateRole);
router.delete('/delete-role', authVerify, cashbinMiddleware, RoleController.deleteRole);
router.get('/:_id', authVerify, cashbinMiddleware, RoleController.getRoleById);

export default router;
