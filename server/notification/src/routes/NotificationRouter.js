import { Router } from 'express';
import notificationController from '../controllers/NotificationController.js';

const router = Router();

router.get('/', notificationController.submit);

export default router;