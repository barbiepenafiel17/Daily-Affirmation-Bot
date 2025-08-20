require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const routes = require('./routes');
const { sendDailyAffirmations } = require('./services/affirmationService');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schedule daily affirmation (8 AM every day)
cron.schedule('0 8 * * *', async () => {
    console.log('Running daily affirmation task...');
    try {
        await sendDailyAffirmations();
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
