const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    preferences: {
        receiveTime: {
            type: String,
            default: '09:00' // Default time to receive affirmations
        },
        categories: [{
            type: String,
            enum: ['motivation', 'health', 'success', 'happiness', 'gratitude'],
            default: ['motivation']
        }]
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
