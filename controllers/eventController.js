import Event from '../models/Event.js';

// ✅ Get all events
export const getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

// ✅ Get events by date
export const getEventsByDate = async (req, res) => {
  const date = req.params.date;
  const startOfDay = new Date(date);
  startOfDay.setHours(0,0,0,0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23,59,59,999);

  const events = await Event.find({
    start: { $gte: startOfDay, $lte: endOfDay }
  });
  res.json(events);
};

// ✅ Create event
export const createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
};

// ✅ Update event
export const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
};

// ✅ Delete event
export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
};
