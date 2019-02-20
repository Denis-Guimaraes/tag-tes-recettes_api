// Local import
const book = require('./bookModel');
const bookType = require('./bookTypeModel');

// Code
/**
 * Function findAll
 * @param {integer} userId
 */
const findAll = (userId) => {
  return book.findAll({
    where: { user_id: userId },
    include: [
      { model: bookType, as: 'type', attributes: ['id', 'name'] }
    ]
  });
};
/**
 * Function findOrCreate
 * @param {integer} userId
 * @param {string} bookName
 * @param {integer} bookType
 */
const findOrCreate = (userId, bookName, bookType) => {
  return book.findOrCreate({
    raw: true,
    where: { user_id: userId, name: bookName, book_type_id: bookType }
  });
};

// Export
module.exports.findAll = findAll;
module.exports.findOrCreate = findOrCreate;
