// Local import
const user = require('./userModel');

// Code
/**
 * Function createUser
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */
const createUser = (username, email, password) => {
  return user.create({
    username,
    email,
    password
  });
};
/**
 * Function findByEmail
 * @param {string} email
 */
const findByEmail = (email) => {
  return user.findOne({
    where: { email: email }
  });
};
/**
 * Function activeUser
 * @param {integer} userId
 */
const activeUser = (userId) => {
  return user.update(
    { active: true },
    { where: { id: userId } }
  );
};
/**
 * Function deleteUser
 * @param {integer} userId
 */
const deleteUser = (userId) => {
  return user.destroy(
    { where: { id: userId } }
  );
};

// Export
module.exports.createUser = createUser;
module.exports.findByEmail = findByEmail;
module.exports.activeUser = activeUser;
module.exports.deleteUser = deleteUser;
