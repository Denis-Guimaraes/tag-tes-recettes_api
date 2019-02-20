// Local import
const tag = require('./tagModel');

// Code
/**
 * Function findOrCreate
 * @param {string} tagName
 */
const findOrCreate = (tagName) => {
  return tag.findOrCreate({
    raw: true,
    where: { name: tagName }
  });
};

// Export
module.exports.findOrCreate = findOrCreate;
