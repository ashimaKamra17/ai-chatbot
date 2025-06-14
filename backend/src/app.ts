import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import chatRoutes from './routes/chat.routes';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Connect to MongoDB (only once)
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

export default app; 