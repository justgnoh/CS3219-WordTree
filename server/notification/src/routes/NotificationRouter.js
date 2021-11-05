import { Router } from 'express';
import * as notificationController from '../controllers/NotificationController.js';

const router = Router();

router.post('/addNotification', notificationController.addNotification);
router.get('/getNotification', notificationController.getNotification);
router.get('/getAllNotification', notificationController.getAllNotification);
router.put('/viewedNotification', notificationController.viewedNotification);
router.put('/viewedAllNotification', notificationController.viewedAllNotification);

export default router;
