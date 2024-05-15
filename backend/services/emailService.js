// Import necessary modules
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

// Function to send an email
const sendEmail = async (toEmail, subject, htmlContent) => {
  try {
    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: subject,
      html: htmlContent
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
