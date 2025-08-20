require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { sendDailyAffirmations } = require('./services/affirmationService');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Add a health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Add an endpoint for Vercel Cron to trigger daily affirmations
app.post('/api/send-affirmations', async (req, res) => {
    try {
        await sendDailyAffirmations();
        res.json({ success: true, message: 'Affirmations sent successfully' });
    } catch (error) {
        console.error('Error sending affirmations:', error);
        res.status(500).json({ success: false, message: 'Error sending affirmations' });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Export the Express app for Vercel
module.exports = app;
