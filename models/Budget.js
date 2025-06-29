import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
