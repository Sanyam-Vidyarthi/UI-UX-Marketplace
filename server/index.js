import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db.js';
import componentRoutes from './routes/componentRoutes.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from UI/UX Marketplace Backend!');
});

// API Routes
app.use('/api/components', componentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
