// Local import
const hashError = require('./hashError');
const hashDAL = require('./hashDAL');

// Code
/**
 * Function disableHash
 * @param {string} uuid
 */
const disableHash = async (uuid) => {
  try {
    // Disable hash
    await hashDAL.disableHash(uuid);
    return true;
  } catch (error) {
    // Log error
    hashError(error);
    return false;
  }
};

// Export
module.exports = disableHash;
