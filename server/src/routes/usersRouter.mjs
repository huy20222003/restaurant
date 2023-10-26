import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//upload
import upload from '../config/multer/index.mjs';
//----------------------------------------------------------------

import UsersController from '../app/controllers/UsersController.mjs';

router.get('/', authVerify,  cashbinMiddleware, UsersController.getAllUser);
router.get('/:_id', authVerify, cashbinMiddleware, UsersController.getSingleUser);
router.post('/create-user', authVerify, cashbinMiddleware, UsersController.createUser);
router.delete('/delete-user/:_id', authVerify, cashbinMiddleware, UsersController.deleteUserById);
router.patch('/update-user/avatar', authVerify, cashbinMiddleware, upload.single("avatarUpdate"), UsersController.updateAvatar);
router.put('/update-user/detail', authVerify, cashbinMiddleware, UsersController.updateInfo);
router.patch('/update-user/password', authVerify, cashbinMiddleware, UsersController.updatePassword);
router.patch('/update-user/role', authVerify, cashbinMiddleware, UsersController.updateRole);

export default router;
