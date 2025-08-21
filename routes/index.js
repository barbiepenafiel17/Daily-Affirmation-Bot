const express = require('express');
const { Subscriber } = require('../models/index.js');
const router = express.Router();

// POST /subscribe
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is required' 
            });
        }

        // Check if email already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email already subscribed' 
            });
        }

        const subscriber = await Subscriber.create({ email });
        res.status(201).json({ 
            success: true, 
            message: 'Successfully subscribed!',
            data: subscriber 
        });
    } catch (error) {
        console.error('Error in subscribe:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// GET /subscribers
router.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json({ 
            success: true, 
            data: subscribers 
        });
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// DELETE /unsubscribe/:email
router.delete('/unsubscribe/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const result = await Subscriber.findOneAndDelete({ email });

        if (!result) {
            return res.status(404).json({ 
                success: false, 
                message: 'Subscriber not found' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Successfully unsubscribed' 
        });
    } catch (error) {
        console.error('Error in unsubscribe:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

module.exports = router;
