// Local import
const recipeDAL = require('./recipeDAL');

// Code
/**
 * Function findAllRecipes
 * @param {integer} bookId
 * @param {integer} userId
 */
const findAllRecipes = async (bookId, userId) => {
  const paramsWhere = {
    book_id: bookId,
    user_id: userId
  };
  const recipes = recipeDAL.findAll(paramsWhere);
  return recipes;
};
/**
 * Function findAllFavorites
 * @param {integer} userId
 */
const findAllFavorites = async (userId) => {
  const paramsWhere = {
    user_id: userId,
    favorite: true
  };
  const recipes = recipeDAL.findAll(paramsWhere);
  return recipes;
};

// Export
module.exports.findAllRecipes = findAllRecipes;
module.exports.findAllFavorites = findAllFavorites;
