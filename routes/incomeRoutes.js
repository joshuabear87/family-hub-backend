import express from 'express';
import {
  getAllIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../controllers/incomeController.js';

const router = express.Router();

router.get('/', getAllIncomes);
router.post('/', createIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

export default router;
