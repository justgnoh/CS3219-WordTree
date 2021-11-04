import { Router } from 'express';
import * as ChallengeController from '../controllers/ChallengeController.js';

export const router = Router();
export const router2 = Router()

router.get('/', ChallengeController.getAllChallengeByUserId);
router.post('/', ChallengeController.createNewChallenge);
router.put('/:id', ChallengeController.addEssayPara);
router.get('/:id', ChallengeController.getChallengeByChallengeId);
router.post('/accept', ChallengeController.acceptChallenge);
router.post('/title', ChallengeController.sendTitle)
router2.get('/', ChallengeController.getAllChallengesWaitingMatch)
