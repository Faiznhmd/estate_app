import express from 'express';
import { shouldBeAdmin, shouldBeLogin } from '../controller/testController.js';
import { verifyToken } from '../middleware/vaerifyToken.js';

const router = express.Router();

router.get('/should-be-login', verifyToken, shouldBeLogin);

router.get('/should-be-admin', shouldBeAdmin);

export default router;
