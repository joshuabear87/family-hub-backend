import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  rrule: String,
  attendees: [String],
  location: String,
  color: String,
}, {
  timestamps: true,
});

export default mongoose.model('Event', eventSchema);
