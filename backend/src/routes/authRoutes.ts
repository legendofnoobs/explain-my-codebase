import express from 'express';
import { register, login, getProfile, updateApiKey } from '../controllers/authController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/update-key', protect, updateApiKey);

export default router;
