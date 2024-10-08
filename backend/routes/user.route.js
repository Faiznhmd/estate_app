import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  savePost,
  updateUser,
  profilePosts,
} from '../controller/userController.js';
import { verifyToken } from '../middleware/vaerifyToken.js';

const router = express.Router();

router.get('/', getAllUsers);
// router.get('/:id', verifyToken, getSingleUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/save', verifyToken, savePost);
router.get('/profilePosts', verifyToken, profilePosts);

export default router;
