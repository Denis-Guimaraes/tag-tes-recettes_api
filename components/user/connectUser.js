// NPM import
const bcrypt = require('bcrypt');

// Local import
const userError = require('./userError');
const userDAL = require('./userDAL');

// Code
/**
 * Function connectUser
 * @param {object} data
 */
const connectUser = async (data) => {
  let status;
  let body;
  try {
    // Find user by email and check password
    const userFind = await userDAL.findByEmail(data.email);
    const password = await bcrypt.compare(data.password, userFind.password);
    if (userFind === null || !password || !userFind.active) {
      // Return status and body
      status = 400;
      body = { error: ['Email ou mot de passe incorrect.'] };
      return { status, body };
    }
    // Return status and body
    status = 200;
    body = {
      userData: {
        id: userFind.id,
        username: userFind.username,
        email: userFind.email
      }
    };
    return { status, body };
  } catch (error) {
    // Log error
    userError(error);
    // Return status and body
    status = 500;
    body = { error: ['Une erreur est survenue, veuillez réessayer!'] };
    return { status, body };
  }
};

module.exports = connectUser;
