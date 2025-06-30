import Event from '../models/Event.js';
import asyncHandler from 'express-async-handler';

// Get all events
export const getAllEvents = asyncHandler(async (req, res) => {
  console.log('📅 Fetching all events');
  const events = await Event.find();
  res.json(events);
});

// Get events by date
export const getEventsByDate = asyncHandler(async (req, res) => {
  const date = req.params.date;
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  console.log(`📅 Fetching events for date: ${date}`);
  const events = await Event.find({
    start: { $gte: startOfDay, $lte: endOfDay },
  });
  res.json(events);
});

// Create event
export const createEvent = asyncHandler(async (req, res) => {
  console.log('➕ Creating event:', req.body);
  const event = new Event(req.body);
  await event.save();
  console.log('✅ Event created:', event);
  res.status(201).json(event);
});

// Update event
export const updateEvent = asyncHandler(async (req, res) => {
  console.log('✏️ Updating event ID:', req.params.id);
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  console.log('✅ Event updated:', event);
  res.json(event);
});

// Delete event
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  await event.deleteOne();
  console.log('🗑️ Event deleted:', req.params.id);
  res.json({ message: 'Event deleted' });
});
