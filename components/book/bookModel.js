// NPM import
const Sequelize = require('sequelize');

// Local import
const { sequelize } = require('../../lib');
const bookType = require('./bookTypeModel');

// Code
// Define book model
const book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  book_type_id: {
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
book.belongsTo(bookType, { as: 'type', foreignKey: 'book_type_id' });
bookType.hasMany(book, { as: 'book', foreignKey: 'id' });

// Export
module.exports = book;
