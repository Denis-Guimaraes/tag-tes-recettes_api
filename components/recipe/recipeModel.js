// NPM import
const Sequelize = require('sequelize');

// Local import
const { sequelize } = require('../../lib');
const book = require('../book/bookModel');
const recipeType = require('./recipeTypeModel');
const user = require('../user/userModel');

// Code
// Define recipe model
const recipe = sequelize.define('recipe', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  book_id: {
    type: Sequelize.INTEGER
  },
  page: {
    type: Sequelize.INTEGER
  },
  recipe_type_id: {
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  favorite: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'create_on'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'update_on'
  }
},
{
  freezeTableName: true
});

// Define foreign key
recipe.belongsTo(book, { as: 'book', foreignKey: 'book_id' });
book.hasMany(recipe, { as: 'recipe', foreignKey: 'id' });
recipe.belongsTo(recipeType, { as: 'type', foreignKey: 'recipe_type_id' });
recipeType.hasMany(recipe, { as: 'recipe', foreignKey: 'id' });
recipe.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
user.hasMany(recipe, { as: 'recipe', foreignKey: 'id' });

// Export
module.exports = recipe;
