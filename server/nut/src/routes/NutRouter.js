import { Router } from 'express';
import * as nutController from '../controllers/NutController.js';

const router = Router();

router.post('/addEssayNut', nutController.addEssayNut);
router.delete('/deleteEssayNut', nutController.deleteEssayNut);
router.post('/addCommunityChallengeNut', nutController.addCommunityChallengeNut);
router.delete('/deleteCommunityChallengeNut', nutController.deleteCommunityChallengeNut);
router.post('/addCommunityEssayNut', nutController.addCommunityEssayNut);
router.delete('/deleteCommunityEssayNut', nutController.deleteCommunityEssayNut);
router.get('/getUserNut/:userId', nutController.getUserNut);

export default router;