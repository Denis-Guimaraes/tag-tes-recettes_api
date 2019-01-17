// Local import
const User = require('./usersModel');

// Code
const createUser = (username, email, password) => {
  return User.create({
    username,
    email,
    password
  });
};

// Export
module.exports.createUser = createUser;
