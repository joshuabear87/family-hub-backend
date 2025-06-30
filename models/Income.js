import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  amount: { type: Number, required: [true, 'Amount is required'] },
  locked: { type: Boolean, default: true },
}, { timestamps: true });

console.log('💰 Income model loaded');

const Income = mongoose.model('Income', incomeSchema);
export default Income;
