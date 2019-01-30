// NPM import
const Sequelize = require('sequelize');

// Local import
const config = require('../config')();

// Code
// Configuration sequelize
const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Export
module.exports = sequelize;
