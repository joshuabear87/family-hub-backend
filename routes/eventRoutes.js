import express from 'express';
import {
  getEventsByDate,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('🔗 Event routes loaded');

router.get('/', protect, getAllEvents);
router.get('/date/:date', protect, getEventsByDate);
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

export default router;
