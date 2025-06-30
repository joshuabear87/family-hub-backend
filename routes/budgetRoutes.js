import express from 'express';
import {
  getAllExpenses,
  createExpense,
  deleteExpense,
} from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('🔗 Budget routes loaded');

router.get('/', protect, getAllExpenses);
router.post('/', protect, createExpense);
router.delete('/:id', protect, deleteExpense);

export default router;
