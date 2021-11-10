import { Router } from 'express';
import * as userController from '../controllers/UserController.js';

const router = Router();

router.post('/createUser', userController.createUser);
router.get('/getUserProfile', userController.getUserProfile);
router.put('/updateUserProfile', userController.updateUserProfile);
router.get('/getInterest', userController.getInterest);
router.get('/getUserInterest', userController.getUserInterest);
router.put('/updateUserInterest', userController.updateUserInterest);

export default router;
