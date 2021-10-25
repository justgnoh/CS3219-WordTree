import { Router } from 'express';
import * as userController from '../controllers/UserController.js';

const router = Router();

router.post('/createUserProfile', userController.createUserProfile);
router.get('/getUserProfile/:userId', userController.getUserProfile);
router.put('/updateUserProfile', userController.updateUserProfile);
router.put('/updateUserTotalNut', userController.updateUserTotalNut);
router.post('/addUserInterest', userController.addUserInterest);
router.delete('/deleteUserInterest', userController.deleteUserInterest);
router.get('/getUserInterest/:userId', userController.getUserInterest);
router.delete('/clearUserInterest/:userId', userController.clearUserInterest);

export default router;