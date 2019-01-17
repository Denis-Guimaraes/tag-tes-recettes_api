// Local import
const User = require('./usersModel');

// Export
module.exports.findAll = (req, res) => {
  User.findAll().then(user => res.send(user));
};
