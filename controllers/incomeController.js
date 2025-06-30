import Income from '../models/Income.js';
import asyncHandler from 'express-async-handler';

// GET all incomes
export const getAllIncomes = asyncHandler(async (req, res) => {
  console.log('💰 Fetching all incomes');
  const incomes = await Income.find();
  res.json(incomes);
});

// POST new income
export const createIncome = asyncHandler(async (req, res) => {
  const { title, amount } = req.body;
  console.log('➕ Creating income:', req.body);
  const income = new Income({ title, amount });
  await income.save();
  console.log('✅ Income created:', income);
  res.status(201).json(income);
});

// PUT update income
export const updateIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (!income) {
    res.status(404);
    throw new Error('Income not found');
  }

  income.amount = req.body.amount ?? income.amount;
  income.locked = req.body.locked ?? income.locked;

  const updated = await income.save();
  console.log('✅ Income updated:', updated);
  res.json(updated);
});

// DELETE income
export const deleteIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (!income) {
    res.status(404);
    throw new Error('Income not found');
  }
  await income.deleteOne();
  console.log('🗑️ Income deleted:', req.params.id);
  res.json({ message: 'Income deleted' });
});
