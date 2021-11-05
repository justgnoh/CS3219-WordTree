import { Router } from 'express';
import * as userController from '../controllers/UserController.js';

const router = Router();

router.post('/createUser', userController.createUser);
router.get('/getUserProfile', userController.getUserProfile);
/* To be added in future once password implementation is done
router.put('/updateUserPassword', userController.updateUserPassword); */
router.put('/updateUserProfile', userController.updateUserProfile);
router.put('/updateUserTotalNut', userController.updateUserTotalNut);
/* To be added in future once admin implementation is done
router.post('/addInterest', userController.addInterest);
router.delete('/deleteInterest', userController.deleteInterest); */
router.get('/getInterest', userController.getInterest);
router.post('/addUserInterest', userController.addUserInterest);
router.delete('/deleteUserInterest', userController.deleteUserInterest);
router.get('/getUserInterest', userController.getUserInterest);
router.delete('/clearUserInterest', userController.clearUserInterest);
router.put('/updateUserInterest', userController.updateUserInterest);

export default router;