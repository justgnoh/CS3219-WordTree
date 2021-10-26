import { Router } from 'express';
import * as communityController from '../controllers/CommunityController.js';

const router = Router();

router.get('/listChallenges', communityController.listChallenges);
router.get('/getChallenge', communityController.getChallenge);

export default router;