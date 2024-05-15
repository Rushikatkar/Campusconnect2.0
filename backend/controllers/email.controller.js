// Import the email service
const { sendEmail } = require('../services/emailService');

// Controller function to send an email
const sendEmailController = async (req, res) => {
  const { toEmail, subject, htmlContent } = req.body;

  try {
    // Send the email
    const result = await sendEmail(toEmail, subject, htmlContent);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendEmailController };
