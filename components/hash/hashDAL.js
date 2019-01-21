// Local import
const hash = require('./hashModel');

// Code
class HashDAL {
  /**
   * Method createHash
   * @param {string} uuidUrl
   * @param {integer} hashActionId
   * @param {integer} userId
   */
  createHash(uuidUrl, hashActionId, userId) {
    return hash.create({
      hash: uuidUrl,
      hash_action_id: hashActionId,
      user_id: userId
    });
  }
  /**
   * Method findOneHash
   * @param {string} uuidUrl
   */
  findOneHash(uuidUrl) {
    return hash.findOne({
      where: {
        hash: uuidUrl
      }
    });
  }
}

// Export
module.exports = new HashDAL();
