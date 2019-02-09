// Local import
const recipe = require('./recipeModel');
const recipeType = require('./recipeTypeModel');
const book = require('../book/bookModel');

// Code
/**
 * Function findAll
 * @param {integer} bookId
 * @param {integer} userId
 */
const findAll = (bookId, userId) => {
  return recipe.findAll({
    where: { book_id: bookId, user_id: userId },
    include: [
      { model: book, as: 'book', attributes: ['id', 'name'] },
      { model: recipeType, as: 'type', attributes: ['id', 'name'] }
    ]
  });
};

// Export
module.exports.findAll = findAll;
