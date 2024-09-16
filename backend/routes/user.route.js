import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from '../controller/userController.js';
import { verifyToken } from '../middleware/vaerifyToken.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', verifyToken, getSingleUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
