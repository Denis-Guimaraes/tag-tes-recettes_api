// NPM import
const Sequelize = require('sequelize');

// Local import
const config = require('./config');

// Code
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
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
