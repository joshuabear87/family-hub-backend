import Todo from '../models/Todo.js';
import asyncHandler from 'express-async-handler';

// GET all todos for user
export const getTodos = asyncHandler(async (req, res) => {
  console.log('📋 Fetching todos for user:', req.user._id);
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// CREATE todo
export const createTodo = asyncHandler(async (req, res) => {
  console.log('➕ Creating todo for user:', req.user._id, 'Text:', req.body.text);

  const todo = new Todo({
    user: req.user._id,
    text: req.body.text,
  });
  const createdTodo = await todo.save();
  console.log('✅ Todo created:', createdTodo);
  res.status(201).json(createdTodo);
});

// UPDATE todo
export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  todo.text = req.body.text || todo.text;
  todo.completed = req.body.completed ?? todo.completed;

  const updatedTodo = await todo.save();
  console.log('✏️ Todo updated:', updatedTodo);
  res.json(updatedTodo);
});

// DELETE todo
export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await todo.deleteOne();
  console.log('🗑️ Todo deleted:', req.params.id);
  res.json({ message: 'Todo deleted' });
});
