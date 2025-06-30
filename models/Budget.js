import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  amount: { type: Number, required: [true, 'Amount is required'] },
  category: { type: String, required: [true, 'Category is required'] },
}, { timestamps: true });

console.log('📦 Budget model loaded');

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
