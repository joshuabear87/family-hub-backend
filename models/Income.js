import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  locked: { type: Boolean, default: true },
}, { timestamps: true });

const Income = mongoose.model('Income', incomeSchema);
export default Income;
