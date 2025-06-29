import express from 'express';
import { getEventsByDate, createEvent, updateEvent, deleteEvent, getAllEvents } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/date/:date', getEventsByDate);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
