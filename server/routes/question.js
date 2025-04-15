import express from 'express';
import { getAllQuestions, getQuestionById } from '../controller/question.js';

const router = express.Router();

router.get('/all', getAllQuestions);
router.get('/:id', getQuestionById);

export default router;