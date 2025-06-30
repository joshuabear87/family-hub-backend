import express from 'express';
import {
  getAllIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../controllers/incomeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('🔗 Income routes loaded');

router.get('/', protect, getAllIncomes);
router.post('/', protect, createIncome);
router.put('/:id', protect, updateIncome);
router.delete('/:id', protect, deleteIncome);

export default router;
