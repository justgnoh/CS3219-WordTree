import { Router } from 'express';
import wordsController from '../controllers/WordController.js';

const router = Router();

router.get('/words/:challengeid/:seqnum', wordsController.getWordsForTurn);
router.post('/wordlist', wordsController.createNewWordList);

export default router;