// NPM import
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Local import
const config = require('../config')();

// Code
// Configuration Oauth2
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  config.mailer.clientId,
  config.mailer.secret,
  'https://developers.google.com/oauthplayground'
);
oauth2Client.setCredentials({
  refresh_token: config.mailer.refreshToken
});

/**
 * Function sendEmail
 * @param {string} userEmail
 * @param {string} subject
 * @param {string} content
 */
const sendEmail = async (userEmail, subject, content) => {
  // Get authorisation Bearer
  const Bearer = await oauth2Client.getRequestHeaders();
  // Configuration smtp transport
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    headers: {
      Authorization: Bearer
    },
    auth: {
      type: 'OAuth2',
      user: config.mailer.email,
      clientId: config.mailer.clientId,
      clientSecret: config.mailer.secret,
      refreshToken: config.mailer.refreshToken
    }
  });
  // Configuration email content
  const mailOptions = {
    from: config.mailer.email,
    to: userEmail,
    subject: subject,
    generateTextFromHTML: true,
    html: content
  };
  // Send email
  await smtpTransport.sendMail(mailOptions);
  smtpTransport.close();
};

// Export
module.exports = sendEmail;
