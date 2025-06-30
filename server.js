import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://family-hub-frontend.vercel.app',
  'https://family-hub-frontend-56695bygh-joshua-atendido-bears-projects.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log('✅ Allowed CORS origin:', origin);
      callback(null, true);
    } else {
      console.warn('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
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

// DEFAULT ROUTE
app.get('/', (req, res) => {
  console.log('🌐 Base route accessed');
  res.send('Family Hub API is running...');
});

// ERROR HANDLING
app.use(notFound);
app.use(errorHandler);

// DB CONNECTION & SERVER START
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, '0.0.0.0', () =>
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );

    process.on('unhandledRejection', (err, promise) => {
      console.error('❌ Unhandled Rejection:', err.message);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
