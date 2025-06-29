import Budget from '../models/Budget.js';

// GET all expenses
export const getAllExpenses = async (req, res) => {
  const expenses = await Budget.find();
  res.json(expenses);
};

// POST new expense
export const createExpense = async (req, res) => {
  const { title, amount, category } = req.body;
  const expense = new Budget({ title, amount, category });
  await expense.save();
  res.status(201).json(expense);
};

// DELETE expense
export const deleteExpense = async (req, res) => {
  const expense = await Budget.findById(req.params.id);
  if (!expense) {
    res.status(404).json({ message: 'Expense not found' });
    return;
  }
  await expense.deleteOne();
  res.json({ message: 'Expense deleted' });
};
