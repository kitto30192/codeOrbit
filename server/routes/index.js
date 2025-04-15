import express from 'express';
import UserRouter from './user.js';
import QuestionController from '../routes/question.js';

const router = express.Router();

router.post('/user', UserRouter);
router.post('/question', QuestionController);

export default router;