// NPM import
const uuidv4 = require('uuid/v4');

// Local import
const hashDAL = require('./hashDAL');

// Code
/**
 * Function dataValidator
 * @param {integer} hashActionId
 * @param {integer} userId
 */
const dataValidator = (hashActionId, userId) => {
  let error = [];
  let data = {};
  // Validate hashActionId
  if (Number.isInteger(hashActionId)) {
    data.hashActionId = hashActionId;
    if (data.hashActionId <= 0 || data.hashActionId >= 4) {
      error.push('hashActionId non valide');
    }
  } else {
    error.push('paramètre hashActionId doit être un entier');
  }
  // Validate userId
  if (Number.isInteger(userId)) {
    data.userId = userId;
    if (data.userId <= 0) {
      error.push('userId non valide');
    }
  } else {
    error.push('paramètre userId doit être un entier');
  }
  // Return result or throw error
  if (error.length <= 0) {
    return { ...data };
  } else {
    return { error: [...error] };
  }
};

/**
 * Function createHash
 * @param {integer} hashActionId
 * @param {integer} userId
 */
const createHash = async (hashActionId, userId) => {
  let hashData = {};
  // Validate data
  const validData = dataValidator(hashActionId, userId);
  if (!validData.error) {
    hashData = { hash: uuidv4(), ...validData };
  } else {
    // Return error
    return { ...validData.error };
  }
  // Create hash
  const hash = await hashDAL.createHash(hashData.hash, hashData.hashActionId, hashData.userId);
  return hash;
};

// Export
module.exports = createHash;
