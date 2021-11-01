import { Router } from 'express';
import * as notificationController from '../controllers/NotificationController.js';

const router = Router();

router.post('/addNotification', notificationController.addNotification);
router.get('/getNotification/:userId', notificationController.getNotification);
router.get('/getAllNotification/:userId', notificationController.getAllNotification);

export default router;