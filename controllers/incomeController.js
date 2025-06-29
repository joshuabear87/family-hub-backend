import Income from '../models/Income.js';

// GET all incomes
export const getAllIncomes = async (req, res) => {
  const incomes = await Income.find();
  res.json(incomes);
};

// POST new income
export const createIncome = async (req, res) => {
  const { title, amount } = req.body;
  const income = new Income({ title, amount });
  await income.save();
  res.status(201).json(income);
};

// PUT update income (amount, lock toggle)
export const updateIncome = async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (!income) {
    res.status(404).json({ message: 'Income not found' });
    return;
  }

  income.amount = req.body.amount ?? income.amount;
  income.locked = req.body.locked ?? income.locked;

  const updated = await income.save();
  res.json(updated);
};

// DELETE income
export const deleteIncome = async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (!income) {
    res.status(404).json({ message: 'Income not found' });
    return;
  }
  await income.deleteOne();
  res.json({ message: 'Income deleted' });
};
