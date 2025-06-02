import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import calculatorRoutes from './routes/calculatorRoutes.js';
import dictionaryRoutes from './routes/dictionaryRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/calc', calculatorRoutes);
app.use('/api/define', dictionaryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;