// NPM import
const validator = require('validator');
const bcrypt = require('bcrypt');

// Local import
const userError = require('./userError');
const userDAL = require('./userDAL');

// Code
/**
 * Function dataValidator
 * @param {object} data
 */
const dataValidator = data => {
  const { username, email, password, confirmPassword } = data;
  let error = [];
  let user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  // Validate username
  if (data.username && typeof username === 'string') {
    user.username = username.trim();
    if (validator.isEmpty(user.username)) {
      error.push('mauvais format de nom d\'utilisateur');
    }
  } else {
    error.push('paramètre username manquant');
  }
  // Validate email
  if (data.email && typeof email === 'string') {
    user.email = email.trim();
    if (!validator.isEmail(user.email)) {
      error.push('mauvais format d\'email');
    }
  } else {
    error.push('paramètre email manquant');
  }
  // Validate password
  if (data.password && typeof password === 'string') {
    user.password = data.password.trim();
    if (user.password.length < 6) {
      error.push('mauvais format de mot de passe');
    }
  } else {
    error.push('paramètre password manquant');
  }
  // Confirm password
  if (data.confirmPassword) {
    user.confirmPassword = confirmPassword.trim();
    if (!validator.equals(user.confirmPassword, user.password)) {
      error.push('erreur de confirmation de mot de passe');
    }
  } else {
    error.push('paramètre confirmPassword manquant');
  }
  // Return result or throw error
  if (error.length <= 0) {
    return { ...user };
  } else {
    return { error: [...error] };
  }
};

/**
 * Function createUser
 * @param {object} data
 */
const createUser = async data => {
  let user = {};
  let status;
  let body;
  // Validate data
  try {
    const validData = dataValidator(data);
    if (!validData.error) {
      user = { ...validData };
    } else {
      status = 400;
      body = { ...validData };
      return { status, body };
    }
  } catch (error) {
    // Log error
    userError(error);
    // Return status and message
    status = 500;
    body = { error: ['une erreur est survenue, veuillez réessayer !'] };
    return { status, body };
  }
  // Create user
  try {
    // Check if user already exist
    const userFind = await userDAL.findByEmail(user.email);
    if (userFind !== null) {
      status = 400;
      body = { error: ['Email déjà lié à un compte utilisateur'] };
      return { status, body };
    }
    // Create new user
    const passwordHash = await bcrypt.hash(user.password, 10);
    await userDAL.createUser(user.username, user.email, passwordHash);
    // Retrun status and data
    status = 200;
    body = { username: user.username, email: user.email };
    return { status, body };
  } catch (error) {
    // Log error
    userError({
      code: error.original.code,
      errno: error.original.errno,
      message: error.original.sqlMessage
    });
    // Return status and message
    status = 500;
    body = { error: ['une erreur est survenue, veuillez réessayer !'] };
    return { status, body };
  }
};

// Export
module.exports = createUser;
