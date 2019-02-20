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
// Schema validator add recipe
const addRecipeSchema = {
  recipeName: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isEmpty: false,
    errorMessage: 'Nom de recette invalide.'
  },
  bookName: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isEmpty: false,
    errorMessage: 'Nom de livre invalide.'
  },
  bookPage: {
    in: ['body'],
    exists: true,
    isInt: true,
    toInt: true,
    isEmpty: false,
    errorMessage: 'Numéro de page invalide.'
  },
  bookType: {
    in: ['body'],
    exists: true,
    isInt: true,
    toInt: true,
    isEmpty: false,
    errorMessage: 'Type de livre invalide.'
  },
  recipeType: {
    in: ['body'],
    exists: true,
    isInt: true,
    toInt: true,
    isEmpty: false,
    errorMessage: 'Id type de recette invalide.'
  },
  favorite: {
    in: ['body'],
    exists: true,
    isBoolean: true,
    toBoolean: true,
    isEmpty: false,
    errorMessage: 'Valeur de favorite invalide.'
  },
  tags: {
    in: ['body'],
    exists: true,
    errorMessage: 'Tags invalide.'
  }
};

module.exports.dataValidator = dataValidator;
module.exports.addRecipeSchema = addRecipeSchema;
