import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  deleteUser,
  updateUserProfile,
} from '../controllers/authController.js';
import { protect, superAdmin } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, superAdmin, deleteUser);

export default router;
