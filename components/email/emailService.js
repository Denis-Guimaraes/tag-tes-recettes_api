// Local import
const { sendEmail } = require('../../lib');

// Code
/**
 * Function confirmEmail
 * @param {string} hash
 */
const confirmEmail = async (hash, userEmail) => {
  // Send confirmation email
  const subject = 'Activation de votre compte sur TTR.';
  const content = `<P>Pour activer votre compte Tag tes recettes, veuillez suivre ce lien:</p>
    <a href="http://localhost:3000/users/active/${hash}">http://localhost/users/active/${hash}</a>`;
  await sendEmail(userEmail, subject, content);
  return true;
};

// Export
module.exports.confirmEmail = confirmEmail;
