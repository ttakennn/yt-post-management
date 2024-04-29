import express from 'express';

import { logout, refreshToken, signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/refresh-token', refreshToken);
router.get('/logout', logout);

export default router;
