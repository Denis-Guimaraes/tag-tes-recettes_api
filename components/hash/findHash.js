// Local import
const hashDAL = require('./hashDAL');

// Code
/**
 * Function findHash
 * @param {string} uuidUrl
 */
const findHash = async uuidUrl => {
  const hash = await hashDAL.findOneHash(uuidUrl);
  return hash;
};

// Export
module.exports = findHash;
