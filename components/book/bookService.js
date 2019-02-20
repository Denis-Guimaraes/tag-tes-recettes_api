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
/**
 * Function findOrCreateBook
 * @param {integer} userId
 * @param {string} bookName
 * @param {integer} bookType
 */
const findOrCreateBook = async (userId, bookName, bookType) => {
  const book = bookDAL.findOrCreate(userId, bookName, bookType);
  return book;
};

// Export
module.exports.findAllBooks = findAllBooks;
module.exports.findOrCreateBook = findOrCreateBook;
