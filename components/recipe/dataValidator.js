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

module.exports.dataValidator = dataValidator;
