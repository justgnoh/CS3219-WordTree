import { Router } from 'express';
import * as nutController from '../controllers/NutController.js';

const router = Router();

router.post('/newEssayNut', nutController.newEssayNut);
router.post('/deleteEssayNut', nutController.deleteEssayNut);
router.get('/viewUserNut/:userId', nutController.viewUserNut);
router.get('/getTotalNut/:userId', nutController.getTotalNut);

export default router;