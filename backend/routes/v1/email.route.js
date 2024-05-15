const express = require('express');
const router = express.Router();
const { sendEmailController } = require('../../controllers/email.controller');

// Route for sending email
router.post('/send-email', sendEmailController);

module.exports = router;
