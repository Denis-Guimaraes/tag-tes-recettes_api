// NPM import
const express = require('express');

// Local import
const { jwt } = require('../../lib');
const bookController = require('./bookController');
const bookError = require('./bookError');

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
// Route for get all books
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = await bookController.findAllBooks(userId);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
// Route for get all recipes of book
router.get('/:bookId/recipes', async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.body;
    const data = await bookController.findAllRecipes(bookId, userId);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
// Error handler
router.use(bookError);

// Export
module.exports = router;
