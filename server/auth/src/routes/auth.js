import { Router } from 'express';
import * as AuthController from '../controllers/AuthController.js';

const router = Router();

router.get('/', AuthController.verifyJWTToken);

export default router;