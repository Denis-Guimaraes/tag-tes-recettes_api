// Local import
const bookService = require('./bookService');

// Code
/**
 * Function findAllBooks
 * @param {integer} userId
 */
const findAllBooks = async (userId) => {
  // Find all books
  const books = await bookService.findAllBooks(userId);
  return books;
};

// Export
module.exports.findAllBooks = findAllBooks;
