// Local import
const hash = require('./hashModel');

// Code
/**
 * Function createHash
 * @param {string} uuid
 * @param {integer} hashActionId
 * @param {integer} userId
 */
const createHash = (uuid, hashActionId, userId) => {
  return hash.create({
    hash: uuid,
    hash_action_id: hashActionId,
    user_id: userId
  });
};
/**
 * Function findOneHash
 * @param {string} uuid
 */
const findOneHash = (uuid) => {
  return hash.findOne({
    where: {
      hash: uuid
    }
  });
};
/**
 * Function disableHash
 * @param {string} uuid
 */
const disableHash = (uuid) => {
  return hash.update(
    { active: false },
    { where: { hash: uuid } }
  );
};

// Export
module.exports.createHash = createHash;
module.exports.findOneHash = findOneHash;
module.exports.disableHash = disableHash;
