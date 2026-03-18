import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import repoRoutes from './routes/repoRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.use(express.json());

// Database Connection Helper
let isConnected = false;
const connectDb = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error('MONGODB_URI is not defined in environment variables');
        throw new Error('Database configuration error');
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(mongoUri);
        isConnected = true;
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};

// Health check (Independent of DB)
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        database: isConnected ? 'connected' : 'disconnected',
        env: process.env.NODE_ENV
    });
});

// Database connection middleware (Lazy connect)
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error: any) {
        console.error('DB Middleware Error:', error);
        res.status(500).json({ 
            error: 'Database connection failed', 
            details: error.message 
        });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/repos', repoRoutes);

// Initial start log
console.log('App successfully initialized. Waiting for requests...');

// Local server for development
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Development server running on port ${PORT}`);
    });
}

export default app;
