// Local import
const recipeService = require('./recipeService');

// Code
/**
 * Function findAllFavorites
 * @param {integer} userId
 */
const findAllFavorites = async (userId) => {
  // Find all favorites recipes
  const recipes = await recipeService.findAllFavorites(userId);
  return recipes;
};

// Export
module.exports.findAllFavorites = findAllFavorites;
