const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'mysql://root:@localhost:3306/daily_affirmation_bot',
    {
        dialect: 'mysql',
        dialectOptions: {
            ssl: process.env.VERCEL ? {
                rejectUnauthorized: true
            } : false
        },
        logging: console.log
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

module.exports = sequelize;
