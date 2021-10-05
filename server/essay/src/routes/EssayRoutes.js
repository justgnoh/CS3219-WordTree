import { Router } from 'express';
import * as essaysController from '../controllers/EssayController.js';

const router = Router();

router.get('/allEssayPara/:challengeid', essaysController.getAllEssayPara);
router.post('/newEssayPara/:challengeid', essaysController.postNewPara);

export default router;
