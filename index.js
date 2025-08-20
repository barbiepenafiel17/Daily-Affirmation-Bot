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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    authSource: 'admin',
    authMechanism: 'SCRAM-SHA-1'
})
    .then(() => {
        console.log('Connected to MongoDB');
        console.log('Database Name:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('Connection string:', process.env.MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//<username>:<password>@'));
    });

// Export the Express app for Vercel
module.exports = app;
