import express from 'express';
import {
  getChats,
  getSingleChat,
  addChat,
  readChat,
} from '../controller/chatController.js';
import { verifyToken } from '../middleware/vaerifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getChats);
router.get('/:id', verifyToken, getSingleChat);
router.post('/', verifyToken, addChat);
router.put('/read/:id', verifyToken, readChat);

export default router;
