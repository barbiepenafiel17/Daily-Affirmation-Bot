const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendAffirmationEmail = async (subscriber, affirmation) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: '🌸 Your Daily Affirmation',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333; text-align: center;">✨ Your Daily Affirmation ✨</h2>
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; text-align: center;">
                    <p style="font-size: 18px; color: #444; line-height: 1.6;">
                        ✨ ${affirmation} ✨
                    </p>
                </div>
                <p style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                    To unsubscribe, click <a href="http://localhost:${process.env.PORT}/unsubscribe/${subscriber.email}">here</a>
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Affirmation sent to ${subscriber.email}`);
    } catch (error) {
        console.error(`Error sending email to ${subscriber.email}:`, error);
        throw error;
    }
};

module.exports = { sendAffirmationEmail };
