import express from 'express';
import { verifyToken } from '../middleware/vaerifyToken.js';
import {
  getPosts,
  getSinglePost,
  addPost,
  updatePost,
  deletePost,
} from '../controller/postController.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/', verifyToken, addPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

export default router;
