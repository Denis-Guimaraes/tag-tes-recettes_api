// NPM import
const uuidv4 = require('uuid/v4');

// Local import
const hashError = require('./hashError');
const hashDAL = require('./hashDAL');

// Code
/**
 * Function createHash
 * @param {integer} hashActionId
 * @param {integer} userId
 */
const createHash = async (hashActionId, userId) => {
  try {
    // Create hash
    const uuid = uuidv4();
    const hashData = await hashDAL.createHash(uuid, hashActionId, userId);
    return hashData;
  } catch (error) {
    // Log error
    hashError(error);
    return false;
  }
};

// Export
module.exports = createHash;
