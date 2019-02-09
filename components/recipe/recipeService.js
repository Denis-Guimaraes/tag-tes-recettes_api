// Local import
const recipeDAL = require('./recipeDAL');

// Code
/**
 * Function findAllRecipes
 * @param {integer} bookId
 * @param {integer} userId
 */
const findAllRecipes = async (bookId, userId) => {
  const recipes = recipeDAL.findAll(bookId, userId);
  return recipes;
};

// Export
module.exports.findAllRecipes = findAllRecipes;
