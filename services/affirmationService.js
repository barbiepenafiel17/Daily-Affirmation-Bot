const axios = require('axios');
const { Subscriber, SentAffirmation } = require('../models/index.js');
const { sendAffirmationEmail } = require('./emailService');

const fetchAffirmation = async () => {
    try {
        const response = await axios.get('https://www.affirmations.dev/');
        return response.data.affirmation;
    } catch (error) {
        console.error('Error fetching affirmation:', error);
        throw error;
    }
};

const sendDailyAffirmations = async () => {
    try {
        // Fetch a new affirmation
        const affirmation = await fetchAffirmation();

        // Get all subscribers
        const subscribers = await Subscriber.find();

        // Send emails to all subscribers
        const emailPromises = subscribers.map(subscriber => 
            sendAffirmationEmail(subscriber, affirmation)
        );

        await Promise.all(emailPromises);

        // Log the sent affirmation
        await SentAffirmation.create({ text: affirmation });

        console.log('Daily affirmations sent successfully!');
    } catch (error) {
        console.error('Error sending daily affirmations:', error);
        throw error;
    }
};

module.exports = { sendDailyAffirmations };
