import Budget from '../models/Budget.js';
import asyncHandler from 'express-async-handler';

// GET all expenses
export const getAllExpenses = asyncHandler(async (req, res) => {
  console.log('📊 Fetching all expenses');
  const expenses = await Budget.find();
  res.json(expenses);
});

// POST new expense
export const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category } = req.body;
  console.log('➕ Creating expense:', req.body);
  const expense = new Budget({ title, amount, category });
  await expense.save();
  console.log('✅ Expense created:', expense);
  res.status(201).json(expense);
});

// DELETE expense
export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Budget.findById(req.params.id);
  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }
  await expense.deleteOne();
  console.log('🗑️ Expense deleted:', expense._id);
  res.json({ message: 'Expense deleted' });
});
