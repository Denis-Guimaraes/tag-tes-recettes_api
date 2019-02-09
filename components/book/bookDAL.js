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

// Export
module.exports.findAll = findAll;
