import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  description: String,
  start: { type: Date, required: [true, 'Start date is required'] },
  end: { type: Date, required: [true, 'End date is required'] },
  rrule: String,
  attendees: [String],
  location: String,
  color: String,
}, { timestamps: true });

console.log('📅 Event model loaded');

const Event = mongoose.model('Event', eventSchema);
export default Event;
