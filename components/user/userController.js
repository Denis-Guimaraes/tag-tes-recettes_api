// Local import
const userService = require('./userService');
const hashService = require('../hash');
const emailService = require('../email');
const { jwt } = require('../../lib');

// Code
/**
 * Function signup
 * @param {Object} body
 */
const signup = async (body) => {
  const data = {};
  // Create user
  const createdUser = await userService.createUser(body);
  data.user = { ...createdUser.user };
  data.message = createdUser.message;
  try {
    // Get hash
    const getHash = await hashService.createHash(1, data.user.id);
    data.hash = getHash.get('hash');
    // Send email
    emailService.confirmEmail(data.hash, data.user.email);
    // Return data
    return data;
  } catch (error) {
    userService.deleteUser(data.user.id);
    throw error;
  }
};
/**
 * Function active
 * @param {string uuidV4} params
 */
const active = async (params) => {
  // Get hash data
  let hash = await hashService.findOneHash(params);
  // Active user
  const data = await userService.activeUser(hash);
  // Disable hash
  hashService.disableHash(hash.hash);
  // Return data
  return data;
};
/**
 * Function signin
 * @param {object} body
 */
const signin = async (body) => {
  const data = {};
  // Connect user
  const connectedUser = await userService.connectUser(body);
  data.user = { ...connectedUser.user };
  // Create JWT
  data.token = jwt.jwtSign(data.user);
  // Return data
  return data;
};

// Export
module.exports.signup = signup;
module.exports.active = active;
module.exports.signin = signin;
