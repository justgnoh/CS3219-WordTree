import { Router } from 'express';
import * as userController from '../controllers/UserController.js';

const router = Router();

router.post('/createUserProfile', userController.createUserProfile);
router.get('/getUserProfile/:userId', userController.getUserProfile);
router.get('/getUserInterest/:userId', userController.getUserInterest);
router.post('/deleteUserInterest', userController.deleteUserInterest);
router.post('/addUserInterest', userController.addUserInterest);

export default router;