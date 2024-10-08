import express from 'express';
import { addMessage } from '../controller/messageContoller.js';
import { verifyToken } from '../middleware/vaerifyToken.js';

const router = express.Router();

router.post('/:chatId', verifyToken, addMessage);

export default router;
