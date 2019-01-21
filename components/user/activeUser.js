// NPM import
const validator = require('validator');

// Local import
const userError = require('./userError');
const userDAL = require('./userDAL');
const hash = require('../hash');

// Code
/**
 * Function dataValidator
 * @param {string} uuidUrl
 */
const dataValidator = uuidUrl => {
  let error = [];
  // Validate uuidUrl
  if (typeof uuidUrl === 'string') {
    uuidUrl = uuidUrl.trim();
    if (!validator.isUUID(uuidUrl, 4)) {
      error.push('hash erreur');
    }
  } else {
    error.push('mauvais format de hash');
  }
  // Return result
  if (error.length <= 0) {
    return uuidUrl;
  } else {
    return { error: [...error] };
  }
};

/**
 * Function activeUser
 * @param {strind} uuidUrl
 */
const activeUser = async uuidUrl => {
  let status;
  let body;
  // Validate data
  try {
    const validData = dataValidator(uuidUrl);
    if (validData.error) {
      // return status and body
      status = 400;
      body = { ...validData };
      return { status, body };
    }
  } catch (error) {
    // Log error
    userError(error);
    // Return status and data
    status = 500;
    body = { error: ['une erreur est survenue, veuillez réessayer !'] };
    return { status, body };
  }
  // Active user
  try {
    // Get hash data
    const hashData = await hash.findHash(uuidUrl);
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
