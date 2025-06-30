import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

const app = express();

dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/events', eventRoutes);

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// DEFAULT ROUTE
app.get('/', (req, res) => {
  res.send('Family Hub API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
