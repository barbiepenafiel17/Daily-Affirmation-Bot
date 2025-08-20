const mongoose = require('mongoose');

const sentAffirmationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    affirmation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Affirmation',
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    opened: {
        type: Boolean,
        default: false
    },
    openedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('SentAffirmation', sentAffirmationSchema);
