import List from '../models/List.js';
import Todo from '../models/Todo.js';
import asyncHandler from 'express-async-handler';

// Create a new list
export const createList = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log('➕ Creating list:', name);

  const list = new List({
    user: req.user._id,
    name,
    todos: [],
  });
  await list.save();
  console.log('✅ List created:', list);
  res.status(201).json(list);
});

// Get all lists for the user
export const getLists = asyncHandler(async (req, res) => {
  console.log('📋 Fetching lists for user:', req.user._id);
  const lists = await List.find({ user: req.user._id }).populate('todos');
  res.json(lists);
});

// Delete a list and its todos
export const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);
  if (!list) {
    res.status(404);
    throw new Error('List not found');
  }

  await Todo.deleteMany({ _id: { $in: list.todos } });
  await list.deleteOne();
  console.log('🗑️ List and its todos deleted:', req.params.id);
  res.json({ message: 'List and todos deleted' });
});

// Add a todo to a list
export const addTodoToList = asyncHandler(async (req, res) => {
  const { text } = req.body;
  console.log('➕ Adding todo to list:', req.params.id, 'Text:', text);

  const todo = new Todo({
    text,
    user: req.user._id,
  });
  await todo.save();

  const list = await List.findById(req.params.id);
  list.todos.push(todo._id);
  await list.save();

  console.log('✅ Todo added to list:', list._id);
  res.status(201).json(todo);
});
