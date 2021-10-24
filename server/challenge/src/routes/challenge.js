import { Router } from 'express';
import * as ChallengeController from '../controllers/ChallengeController';

const router = Router();

router.get('/', ChallengeController.getAllChallengeByUserId);
router.post('/', ChallengeController.createNewChallenge);
router.put('/:id', ChallengeController.addEssayPara);
// router.get('/:id', ChallengeController.getChallengeByChallengeID);

export default router;