// NPM import
const express = require('express');

// Local import
const { jwt } = require('../../lib');
const recipeError = require('./recipeError');

// Code
const router = express.Router();
// Check for valid JWT
router.use((req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.jwtVerify(token);
    req.body.userId = user.id;
    next();
  } catch (error) {
    error.name = 'UnauthorizedError';
    error.messages = error.message;
    next(error);
  }
});
// Error handler
router.use(recipeError);

// Export
module.exports = router;
