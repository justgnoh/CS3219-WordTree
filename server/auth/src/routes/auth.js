import { Router } from 'express';
import * as AuthController from '../controllers/AuthController.js';

const router = Router();

router.get('/challenge/*', AuthController.getRequest);
router.post('/', AuthController.getRequest);
router.put('/:id', AuthController.getRequest);
router.get('/:id', AuthController.getRequest);

export default router;