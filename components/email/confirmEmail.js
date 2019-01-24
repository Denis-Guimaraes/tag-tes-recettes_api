// Local import
const sendEmail = require('../../mailer');
const emailError = require('./emailError');

// Code
/**
 * Function confirmEmail
 * @param {string} hash
 */
const confirmEmail = async hash => {
  try {
    // Send confirmation email
    const subject = 'Activation de votre compte sur TTR';
    const content = `<P>Pour activer votre compte Tag tes recettes, veuillez suivre ce lien :</p>
      <a href="http://localhost:3000/user/active/${hash}">http://localhost/user/active/${hash}</a>`;
    await sendEmail(subject, content);
    return true;
  } catch (error) {
    // Log error
    emailError(error);
    return false;
  }
};

// Export
module.exports = confirmEmail;
