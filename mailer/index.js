// NPM import
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Local import
// eslint-disable-next-line node/no-unpublished-require
const config = require('./mailerConfig');
const mailerError = require('./mailerError');

// Code
// Configuration Oauth2
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  config.clientId,
  config.clientSecret,
  'https://developers.google.com/oauthplayground'
);
oauth2Client.setCredentials({
  refresh_token: config.refreshToken
});

/**
 * Function sendEmail
 * @param {string} subject
 * @param {string} content
 */
const sendEmail = async (userEmail, subject, content) => {
  try {
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
        user: config.email,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken
      }
    });
    // Configuration email content
    const mailOptions = {
      from: config.email,
      to: userEmail,
      subject: subject,
      generateTextFromHTML: true,
      html: content
    };
    // Send email
    await smtpTransport.sendMail(mailOptions);
    smtpTransport.close();
  } catch (error) {
    mailerError(error);
  }
};

// Export
module.exports = sendEmail;
