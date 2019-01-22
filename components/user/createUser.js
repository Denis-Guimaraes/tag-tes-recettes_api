// NPM import
const bcrypt = require('bcrypt');

// Local import
const userError = require('./userError');
const userDAL = require('./userDAL');

// Code
/**
 * Function createUser
 * @param {object} data
 */
const createUser = async data => {
  let status;
  let body;
  try {
    // Check if user already exist
    const userFind = await userDAL.findByEmail(data.email);
    if (userFind !== null) {
      status = 400;
      body = { error: ['email déjà lié à un compte utilisateur'] };
      return { status, body };
    }
    // Check if password match confirmPasswor
    if (data.password !== data.confirmPassword) {
      status = 400;
      body = { error: ['erreur confirmation de mot de passe'] };
      return { status, body };
    }
    // Create new user
    const passwordHash = await bcrypt.hash(data.password, 10);
    const userCreated = await userDAL.createUser(data.username, data.email, passwordHash);
    const userData = await userCreated.get();
    // Retrun status and data
    status = 200;
    const id = userData.id;
    body = { username: data.username, email: data.email };
    return { status, id, body };
  } catch (error) {
    // Log error
    userError(error);
    // Return status and message
    status = 500;
    body = { error: ['une erreur est survenue, veuillez réessayer !'] };
    return { status, body };
  }
};

// Export
module.exports = createUser;
