// Local import
const user = require('./userModel');

// Code
class UserDAL {
  /**
   * Method createUser
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  createUser(username, email, password) {
    return user.create({
      username,
      email,
      password
    });
  }
  /**
   * Method findByEmail
   * @param {string} email
   */
  findByEmail(email) {
    return user.findOne({
      where: { email: email }
    });
  }
  /**
   * Method activeUser
   * @param {integer} userId
   */
  activeUser(userId) {
    return user.update(
      { active: true },
      { where: { id: userId } }
    );
  }
}

// Export
module.exports = new UserDAL();
