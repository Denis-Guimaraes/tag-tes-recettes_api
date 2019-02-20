// Local import
const recipe = require('./recipeModel');
const recipeType = require('./recipeTypeModel');
const recipeTag = require('./recipeTagModel');
const tag = require('../tag/tagModel');
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
      { model: recipeType, as: 'type', attributes: ['id', 'name'] },
      { model: tag, attributes: ['id', 'name'], through: { attributes: [] } }
    ]
  });
};
/**
 * Function create
 * @param {object} recipeData
 */
const create = (recipeData) => {
  return recipe.create(recipeData);
};
/**
 * Function createRecipeTag
 * @param {integer} recipeId
 * @param {integer} tagId
 */
const createRecipeTag = (recipeId, tagId) => {
  return recipeTag.create({
    recipe_id: recipeId,
    tag_id: tagId
  });
};

// Export
module.exports.findAll = findAll;
module.exports.create = create;
module.exports.createRecipeTag = createRecipeTag;
