// Local import
const User = require('./usersModel');

// Code
class UsersDAL {
  // Create a new user
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
