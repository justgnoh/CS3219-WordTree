import { Router } from 'express';
import * as ChallengeController from '../controllers/ChallengeController.js';

const router = Router();

router.get('/', ChallengeController.getAllChallengeByUserId);
router.post('/', ChallengeController.createNewChallenge);
router.put('/:id', ChallengeController.addEssayPara);
router.get('/:id', ChallengeController.getChallengeByChallengeId);

export default router;