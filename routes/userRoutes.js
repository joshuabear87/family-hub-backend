import express from 'express';
import { registerUser, authUser, approveUser, getUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.put('/:id/approve', protect, admin, approveUser);
router.get('/', protect, admin, getUsers);

export default router;
