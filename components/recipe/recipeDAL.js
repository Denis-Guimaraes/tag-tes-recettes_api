// Local import
const recipe = require('./recipeModel');
const recipeType = require('./recipeTypeModel');
const book = require('../book/bookModel');

// Code
/**
 * Function findAll
 * @param {object} paramsWhere
 */
const findAll = (paramsWhere) => {
  return recipe.findAll({
    where: paramsWhere,
    include: [
      { model: book, as: 'book', attributes: ['id', 'name'] },
      { model: recipeType, as: 'type', attributes: ['id', 'name'] }
    ]
  });
};

// Export
module.exports.findAll = findAll;
