// Local import
const userError = require('./userError');
const userDAL = require('./userDAL');

// Code
/**
 * Function activeUser
 * @param {strind} hashData
 */
const activeUser = async (hashData) => {
  let status;
  let body;
  try {
    if (hashData.hash_action_id === 1 && hashData.active) {
      await userDAL.activeUser(hashData.user_id);
      // Return status and data
      status = 200;
      body = `<P>Votre compte a bien été activé!</p>
        <a href="http://localhost:8080">Tag tes recettes</a>`;
      return { status, body };
    } else {
      // Return status and data
      status = 404;
      body = `<P>Lien inactif.</p>
        <a href="http://localhost:8080">Tag tes recettes</a>`;
      return { status, body };
    }
  } catch (error) {
    // Log error
    userError(error);
    // Return status and data
    status = 500;
    body = `<P>Une erreur est survenue, veuillez réessayer!</p>
    <a href="http://localhost:8080">Tag tes recettes</a>`;
    return { status, body };
  }
};

// Export
module.exports = activeUser;
