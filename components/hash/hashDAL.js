// Local import
const hash = require('./hashModel');

// Code
class HashDAL {
  /**
   * Method createHash
   * @param {string} uuid
   * @param {integer} hashActionId
   * @param {integer} userId
   */
  createHash(uuid, hashActionId, userId) {
    return hash.create({
      hash: uuid,
      hash_action_id: hashActionId,
      user_id: userId
    });
  }
  /**
   * Method findOneHash
   * @param {string} uuid
   */
  findOneHash(uuid) {
    return hash.findOne({
      where: {
        hash: uuid
      }
    });
  }
  /**
   * Method disableHash
   * @param {string} uuid
   */
  disableHash(uuid) {
    return hash.update(
      { active: false },
      { where: { hash: uuid } }
    );
  }
}

// Export
module.exports = new HashDAL();
