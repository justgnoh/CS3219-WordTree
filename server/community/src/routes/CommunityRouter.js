import { Router } from 'express';
import * as communityController from '../controllers/CommunityController.js';

const router = Router();

router.post('/listChallenges', communityController.listChallenges);
router.post('/getChallenge', communityController.getChallenge);

export default router;