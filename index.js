require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const { sendDailyAffirmations } = require('./services/affirmationService');
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

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

// Database connection testing moved to config/database.js

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the Express app for Vercel
module.exports = app;
