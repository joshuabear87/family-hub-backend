import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('🔗 Todo routes loaded');

router.route('/')
  .get(protect, getTodos)
  .post(protect, createTodo);

router.route('/:id')
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

export default router;
