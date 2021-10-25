import { Router } from 'express';
import * as wordsController from '../controllers/WordController.js';

const router = Router();

//Called by Challenge service to get 3 words and by Essay Service to check words used
router.get('/words/:challengeid/:seqnum', wordsController.getWordsForTurn);

//Called by Challenge Service to initialise the word list 
router.post('/wordlist', wordsController.createNewWordList);


router.post('/testpost', wordsController.test);
router.get('/testroute', wordsController.testroute);

export default router;
