// NPM import
const Sequelize = require('sequelize');

// Local import
const sequelize = require('../../db');
const hashAction = require('./hashActionModel');
const user = require('../user/userModel');

// Code
// Define hash model
const hash = sequelize.define('hash', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hash: {
    type: Sequelize.STRING,
    unique: true
  },
  hash_action_id: {
    type: Sequelize.INTEGER
  },
  user_id: {
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

// Define foreign key
hash.belongsTo(hashAction, { as: 'action', foreignKey: 'hash_action_id' });
hash.belongsTo(user, { as: 'user', foreignKey: 'user_id' });

// Export
module.exports = hash;
