// Local import
const recipeService = require('./recipeService');
const bookService = require('../book/bookService');
const tagService = require('../tag/tagService');

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
/**
 * Function addRecipe
 * @param {object} data
 */
const addRecipe = async (data) => {
  // Find or create book
  const [book] = await bookService.findOrCreateBook(data.userId, data.bookName, data.bookType);
  data.bookId = book.id;
  // Add recipe
  const recipe = await recipeService.addRecipe(data);
  // Associate tags
  if (Array.isArray(data.tags)) {
    await Promise.all(data.tags.map(async (tag) => {
      const [tagData] = await tagService.findOrCreateTag(tag);
      await recipeService.createRecipeTag(recipe.id, tagData.id);
    }));
  } else {
    const [tagData] = await tagService.findOrCreateTag(data.tags);
    await recipeService.createRecipeTag(recipe.id, tagData.id);
  }
  return recipe;
};

// Export
module.exports.findAllFavorites = findAllFavorites;
module.exports.addRecipe = addRecipe;
