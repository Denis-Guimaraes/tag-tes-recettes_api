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
/**
 * Function addRecipe
 * @param {object} data
 */
const addRecipe = async (data) => {
  const recipeData = {
    user_id: data.userId,
    name: data.recipeName,
    book_id: data.bookId,
    page: data.bookPage,
    recipe_type_id: data.recipeType,
    favorite: data.favorite
  };
  const recipe = recipeDAL.create(recipeData);
  return recipe;
};
/**
 * Function createRecipeTag
 * @param {integer} recipeId
 * @param {integer} tagId
 */
const createRecipeTag = async (recipeId, tagId) => {
  const recipeTag = recipeDAL.createRecipeTag(recipeId, tagId);
  return recipeTag;
};

// Export
module.exports.findAllRecipes = findAllRecipes;
module.exports.findAllFavorites = findAllFavorites;
module.exports.addRecipe = addRecipe;
module.exports.createRecipeTag = createRecipeTag;
