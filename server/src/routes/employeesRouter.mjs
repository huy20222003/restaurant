import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//controller
import EmployeesController from '../app/controllers/EmployeesController.mjs';
//-------------------------------------------------------------

router.patch('/update-employee/password', authVerify, cashbinMiddleware, EmployeesController.updatePassword);
router.patch('/update-employee/avatar', authVerify, cashbinMiddleware, EmployeesController.updateAvatar);
router.put('/update-employee/detail', authVerify, cashbinMiddleware, EmployeesController.updateInfo);
router.get('/', authVerify, cashbinMiddleware, EmployeesController.getAllEmployees);
router.get('/:_id', authVerify, cashbinMiddleware, EmployeesController.getSingleEmployee);
router.post('/create-emloyee', authVerify, cashbinMiddleware, EmployeesController.addEmployee);
router.put('/update-employee/:_id', authVerify, cashbinMiddleware, EmployeesController.updateEmployee);
router.delete('/delete-employee/:_id', authVerify, cashbinMiddleware, EmployeesController.deleteEmployee);
router.patch('/update-employee/role', authVerify, cashbinMiddleware, EmployeesController.updateRole);

export default router;
