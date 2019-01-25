// Local import
const hashError = require('./hashError');
const hashDAL = require('./hashDAL');

// Code
/**
 * Function findHash
 * @param {string} uuid
 */
const findHash = async (uuid) => {
  try {
    // Get hash
    const hash = await hashDAL.findOneHash(uuid);
    return hash;
  } catch (error) {
    // Log error
    hashError(error);
    return false;
  }
};

// Export
module.exports = findHash;
