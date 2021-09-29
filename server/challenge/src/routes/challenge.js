import { Router } from 'express';
import ChallengeController from '../controllers/ChallengeController';

const router = Router();

router.get('/', ChallengeController.getAllChallengeByUserId);
// router.get('/books/:id', booksController.getOneBookById);
// router.post('/books/sort', booksController.getSortedBooks);
// router.delete('/books/:id', booksController.deleteOneBookById);

export default router;