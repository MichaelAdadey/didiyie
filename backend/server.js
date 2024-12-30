const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dishesRoutes = require('./routes/dishes');
const usersRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Use built-in express.json() instead of body-parser

// Routes
app.use('/api/dishes', dishesRoutes);
app.use('/api/users', usersRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ message: 'Backend is running smoothly!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Check if PORT is defined
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});