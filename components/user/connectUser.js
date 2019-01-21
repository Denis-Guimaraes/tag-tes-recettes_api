// NPM import
const validator = require('validator');
const bcrypt = require('bcrypt');

// Local import
const userError = require('./userError');
const userDAL = require('./userDAL');
const jwt = require('../../jwt');

// Code
/**
 * Function dataValidator
 * @param {object} data
 */
const dataValidator = data => {
  const { email, password } = data;
  let error = false;
  let user = {
    email: '',
    password: ''
  };
  // Validate email
  if (data.email && typeof email === 'string') {
    user.email = email.trim();
    if (!validator.isEmail(user.email)) {
      error = true;
    }
  } else {
    error = true;
  }
  // Validate password
  if (data.password && typeof password === 'string') {
    user.password = data.password.trim();
    if (user.password.length < 6) {
      error = true;
    }
  } else {
    error = true;
  }
  // Return result
  if (!error) {
    return { ...user };
  } else {
    return { error: ['email ou mot de passe incorrect'] };
  }
};

/**
 * Function connectUser
 * @param {object} data
 */
const connectUser = async data => {
  let user = {};
  let status;
  let body;
  // Validate data
  try {
    const validData = dataValidator(data);
    if (!validData.error) {
      user = { ...validData };
    } else {
      // Return status and data
      status = 400;
      body = { ...validData };
      return { status, body };
    }
  } catch (error) {
    // Log error
    userError(error);
    // Return status and data
    status = 500;
    body = { error: ['une erreur est survenue, veuillez réessayer !'] };
    return { status, body };
  }
  try {
    // Find user by email and check password
    const userFind = await userDAL.findByEmail(user.email);
    const password = await bcrypt.compare(user.password, userFind.password);
    if (userFind === null || !password) {
      // Return status and body
      status = 400;
      body = { error: ['email ou mot de passe incorrect'] };
      return { status, body };
    }
    // Create JWT
    const token = await jwt.jwtSign(userFind);
    // Return status and body
    status = 200;
    body = {
      token: token,
      user: {
        id: userFind.id,
        username: userFind.username,
        email: userFind.email
      }
    };
    return { status, body };
  } catch (error) {
    // Log error
    userError(error);
    // Return status and body
    status = 500;
    body = { error: ['une erreur est survenue, veuillez réessayer !'] };
    return { status, body };
  }
};

module.exports = connectUser;
