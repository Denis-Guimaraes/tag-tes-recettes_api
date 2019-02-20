// NPM import
const express = require('express');
const { checkSchema } = require('express-validator/check');

// Local import
const { jwt } = require('../../lib');
const { addRecipeSchema, dataValidator } = require('./dataValidator');
const recipeController = require('./recipeController');
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
// Route for get all favorites recipes
router.get('/favorites', async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = await recipeController.findAllFavorites(userId);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
// Route for add recipe
router.post('/', [checkSchema(addRecipeSchema), dataValidator], async (req, res, next) => {
  try {
    const recipeData = {
      userId: req.body.userId,
      recipeName: req.body.recipeName,
      bookName: req.body.bookName,
      bookPage: req.body.bookPage,
      bookType: req.body.bookType,
      recipeType: req.body.recipeType,
      favorite: req.body.favorite,
      tags: req.body.tags
    };
    const data = await recipeController.addRecipe(recipeData);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
// Error handler
router.use(recipeError);

// Export
module.exports = router;
