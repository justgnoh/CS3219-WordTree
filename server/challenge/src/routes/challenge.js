import { Router } from 'express';
import * as ChallengeController from '../controllers/ChallengeController';

const router = Router();

router.get('/', ChallengeController.getAllChallengeByUserId);
router.post('/', ChallengeController.createNewChallenge);
router.put('/:id', ChallengeController.addEssayExtract);
router.get('/:id', ChallengeController.getChallengeByChallengeID);
// router.post('/books/sort', booksController.getSortedBooks);
// router.delete('/books/:id', booksController.deleteOneBookById);

export default router;