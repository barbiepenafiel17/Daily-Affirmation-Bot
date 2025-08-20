const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const sentAffirmationSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
const SentAffirmation = mongoose.model('SentAffirmation', sentAffirmationSchema);

module.exports = { Subscriber, SentAffirmation };
