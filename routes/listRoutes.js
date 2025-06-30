import express from 'express';
import {
  createList,
  getLists,
  deleteList,
  addTodoToList,
} from '../controllers/listController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('🔗 List routes loaded');

router.route('/')
  .post(protect, createList)
  .get(protect, getLists);

router.route('/:id')
  .delete(protect, deleteList);

router.route('/:id/todos')
  .post(protect, addTodoToList);

export default router;
