// Local import
const bookService = require('./bookService');
const { recipeService } = require('../recipe');

// Code
/**
 * Function findAllBooks
 * @param {integer} userId
 */
const findAllBooks = async (userId) => {
  // Find all books
  const books = await bookService.findAllBooks(userId);
  return books;
};
/**
 * Function findAllRecipes
 * @param {integer} bookId
 * @param {integer} userId
 */
const findAllRecipes = async (bookId, userId) => {
  // Find all recipes of one book
  const recipes = await recipeService.findAllRecipes(bookId, userId);
  return recipes;
};

// Export
module.exports.findAllBooks = findAllBooks;
module.exports.findAllRecipes = findAllRecipes;
