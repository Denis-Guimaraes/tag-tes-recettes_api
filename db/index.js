// NPM import
const Sequelize = require('sequelize');

// Local import
// eslint-disable-next-line node/no-unpublished-require
const config = require('./dbConfig');

// Code
// configuration sequelize for connect database
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
