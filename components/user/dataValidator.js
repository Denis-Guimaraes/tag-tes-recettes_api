// NPM import
const { validationResult } = require('express-validator/check');

// Code
// Function dataValidator
const dataValidator = (req, res, next) => {
  // Get validation result
  const errors = validationResult(req);
  // Check for error
  if (!errors.isEmpty()) {
    const error = new Error('invalid value');
    error.name = 'ValidationError';
    error.messages = errors.array().map(error => error.msg);
    next(error);
  }
  next();
};
// Schema validator signup
const signupSchema = {
  username: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isEmpty: false,
    errorMessage: 'Nom d\'utilisateur invalide.'
  },
  email: {
    in: ['body'],
    exists: true,
    isEmail: true,
    trim: true,
    errorMessage: 'Email invalide.'
  },
  password: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } },
    errorMessage: 'Mot de passe invalide.'
  },
  confirmPassword: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } },
    errorMessage: 'Confirmation mot de passe invalide.'
  }
};
// Schema validator active
const activeSchema = {
  hash: {
    in: ['params'],
    exists: true,
    isUUID: { options: 4 },
    trim: true,
    errorMessage: 'Hash invalide.'
  }
};
// Schema validator signin
const signinSchema = {
  email: {
    in: ['body'],
    exists: true,
    isEmail: true,
    trim: true,
    errorMessage: 'Email invalide.'
  },
  password: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } },
    errorMessage: 'Password invalide.'
  }
};

module.exports.dataValidator = dataValidator;
module.exports.signupSchema = signupSchema;
module.exports.activeSchema = activeSchema;
module.exports.signinSchema = signinSchema;
