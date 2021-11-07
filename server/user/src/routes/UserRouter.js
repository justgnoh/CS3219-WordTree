import { Router } from 'express';
import * as userController from '../controllers/UserController.js';

const router = Router();

router.post('/createUser', userController.createUser);
router.get('/getUserProfile', userController.getUserProfile);
router.put('/updateUserProfile', userController.updateUserProfile);
router.put('/updateUserTotalNut', userController.updateUserTotalNut);
router.get('/getInterest', userController.getInterest);
router.post('/addUserInterest', userController.addUserInterest);
router.delete('/deleteUserInterest', userController.deleteUserInterest);
router.get('/getUserInterest', userController.getUserInterest);
router.delete('/clearUserInterest', userController.clearUserInterest);
router.put('/updateUserInterest', userController.updateUserInterest);

export default router;