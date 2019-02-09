// Local import
const bookDAL = require('./bookDAL');

// Code
/**
 * Function findAllBooks
 * @param {integer} userId
 */
const findAllBooks = async (userId) => {
  const books = bookDAL.findAll(userId);
  return books;
};

// Export
module.exports.findAllBooks = findAllBooks;
