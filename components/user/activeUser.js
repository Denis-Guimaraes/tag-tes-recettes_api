// Local import
const userError = require('./userError');
const userDAL = require('./userDAL');

// Code
/**
 * Function activeUser
 * @param {strind} uuidUrl
 */
const activeUser = async hashData => {
  let status;
  let body;
  try {
    if (hashData.hash_action_id === 1) {
      await userDAL.activeUser(hashData.user_id);
      // Return status and data
      status = 200;
      body = `<P>Votre compte a bien été activé !</p>
        <a href="http://localhost:8080">Tag tes recettes</a>`;
      return { status, body };
    } else {
      // Return status and data
      status = 400;
      body = `<P>lien inactif</p>
        <a href="http://localhost:8080">Tag tes recettes</a>`;
      return { status, body };
    }
  } catch (error) {
    // Log error
    userError(error);
    // Return status and data
    status = 500;
    body = `<P>une erreur est survenue, veuillez réessayer !</p>
    <a href="http://localhost:8080">Tag tes recettes</a>`;
    return { status, body };
  }
};

// Export
module.exports = activeUser;
