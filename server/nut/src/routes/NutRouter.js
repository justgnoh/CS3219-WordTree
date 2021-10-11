import { Router } from 'express';
import * as nutController from '../controllers/NutController.js';

const router = Router();

router.post('/addNut', nutController.addNut);
router.post('/deleteNut', nutController.deleteNut);
router.get('/viewUserNut/:userId', nutController.viewUserNut);
router.get('/getTotalNut/:userId', nutController.getTotalNut);

export default router;