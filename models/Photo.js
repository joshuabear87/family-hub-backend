import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  url: { type: String, required: [true, 'Photo URL is required'] },
  public_id: { type: String, required: [true, 'Public ID is required'] },
  caption: String,
}, { timestamps: true });

console.log('🖼️ Photo model loaded');

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
