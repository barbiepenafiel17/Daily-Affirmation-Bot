const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscriber = sequelize.define('Subscriber', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'subscribers'
});

const SentAffirmation = sequelize.define('SentAffirmation', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'sent_affirmations'
});

// Sync all models with database
(async () => {
    try {
        await sequelize.sync();
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

module.exports = { Subscriber, SentAffirmation };
