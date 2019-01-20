// Local import
const User = require('./userModel');

// Code
class UserDAL {
  /**
   * Method createUser
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  createUser(username, email, password) {
    return User.create({
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
    return User.findOne({
      where: { email: email }
    });
  }
}

// Export
module.exports = new UserDAL();
