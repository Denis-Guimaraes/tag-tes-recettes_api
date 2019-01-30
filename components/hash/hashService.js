// NPM import
const uuidv4 = require('uuid/v4');

// Local import
const hashDAL = require('./hashDAL');

// Code
/**
 * Function createHash
 * @param {integer} hashActionId
 * @param {integer} userId
 */
const createHash = async (hashActionId, userId) => {
  // Create hash
  const uuid = uuidv4();
  const hash = await hashDAL.createHash(uuid, hashActionId, userId);
  return hash;
};
/**
 * Function findHash
 * @param {string} uuid
 */
const findOneHash = async (uuid) => {
  // Get hash
  const hash = await hashDAL.findOneHash(uuid);
  return hash;
};
/**
 * Function disableHash
 * @param {string} uuid
 */
const disableHash = async (uuid) => {
  // Disable hash
  await hashDAL.disableHash(uuid);
  return true;
};

// Export
module.exports.createHash = createHash;
module.exports.findOneHash = findOneHash;
module.exports.disableHash = disableHash;
