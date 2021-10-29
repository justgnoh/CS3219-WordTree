import { Router } from 'express';
import * as essaysController from '../controllers/EssayController.js';

const router = Router();

//Called by Challenge Service and Community Service
router.get('/allEssayPara/:challengeid', essaysController.getAllEssayPara);

//Called by Challenge Service to add the essay para into the database
router.post('/newEssayPara/:challengeid', essaysController.postNewPara);

router.get('/test', essaysController.test);

router.post('/test2', essaysController.test2);

export default router;
