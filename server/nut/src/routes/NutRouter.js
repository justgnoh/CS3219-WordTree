import { Router } from 'express';
import * as nutController from '../controllers/NutController.js';

const router = Router();

router.post('/createEssayNut', nutController.createEssayNut);
router.delete('/deleteEssayNut', nutController.deleteEssayNut);
router.post('/createCommunityChallengeNut', nutController.createCommunityChallengeNut);
router.delete('/deleteCommunityChallengeNut', nutController.deleteCommunityChallengeNut);
router.post('/createCommunityEssayNut', nutController.createCommunityEssayNut);
router.delete('/deleteCommunityEssayNut', nutController.deleteCommunityEssayNut);
router.get('/viewUserNut/:userId', nutController.viewUserNut);
router.get('/getUserTotalNut/:userId', nutController.getUserTotalNut);

export default router;