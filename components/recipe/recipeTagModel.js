// NPM import
const Sequelize = require('sequelize');

// Local import
const { sequelize } = require('../../lib');

// Code
// Define recipeTag model
const recipeTag = sequelize.define('recipe_tag', {
  recipe_id: {
    type: Sequelize.INTEGER
  },
  tag_id: {
    type: Sequelize.INTEGER
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

// Export
module.exports = recipeTag;
