import express from 'express';
import { updateTodo, deleteTodo } from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id')
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

export default router;
