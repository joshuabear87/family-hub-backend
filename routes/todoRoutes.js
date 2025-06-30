import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all todos & POST new todo
router.route('/')
  .get(protect, getTodos)
  .post(protect, createTodo);

// PUT & DELETE specific todo
router.route('/:id')
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

export default router;
