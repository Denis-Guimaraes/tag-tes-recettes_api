// Local import
const User = require('./usersModel');

// Code
class UsersDAL {
  createUser(username, email, password) {
    return User.create({
      username,
      email,
      password
    });
  }
}

// Export
module.exports = new UsersDAL();
