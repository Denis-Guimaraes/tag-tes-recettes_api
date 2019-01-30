// NPM import
const Sequelize = require('sequelize');

// Local import
const { sequelize } = require('../../lib');

// Code
// Define hashAction model
const hashAction = sequelize.define('hash_action', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
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
module.exports = hashAction;
