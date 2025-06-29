import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
}, {
  timestamps: true,
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
