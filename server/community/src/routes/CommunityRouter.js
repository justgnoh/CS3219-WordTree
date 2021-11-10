import { Router } from 'express';
import * as communityController from '../controllers/CommunityController.js';

const router = Router();

router.get('/listChallenges/:offset?/:limit?', communityController.listChallenges);
router.get('/getChallenge/:challengeId', communityController.getChallenge);

export default router;
