// Local import
const sendEmail = require('../../mailer');
const hash = require('../hash');

// Code
/**
 * Function confirmEmail
 * @param {integer} userId
 */
const confirmEmail = async userId => {
  const getHash = await hash.createHash(1, userId);
  const hashData = await getHash.get();
  const subject = 'Activation de votre compte sur TTR';
  const content = `<P>Pour activer votre compte Tag tes recettes, veuillez suivre ce lien :</p>
    <a href="http://localhost:3000/user/active/${hashData.hash}">http://localhost/user/active/${hashData.hash}</a>`;
  sendEmail(subject, content);
};

// Export
module.exports = confirmEmail;
