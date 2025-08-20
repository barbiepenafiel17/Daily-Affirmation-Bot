const mongoose = require('mongoose');

const affirmationSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add affirmation text'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please specify a category'],
        enum: ['motivation', 'health', 'success', 'happiness', 'gratitude']
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    usageCount: {
        type: Number,
        default: 0
    },
    lastUsed: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Increase usage count when affirmation is sent
affirmationSchema.methods.incrementUsage = async function() {
    this.usageCount += 1;
    this.lastUsed = Date.now();
    return this.save();
};

module.exports = mongoose.model('Affirmation', affirmationSchema);
