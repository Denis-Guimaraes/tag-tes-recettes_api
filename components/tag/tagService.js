// Local import
const tagDAL = require('./tagDAL');

// Code
/**
 * Function findOrCreateTag
 * @param {string} tagName
 */
const findOrCreateTag = async (tagName) => {
  const tag = tagDAL.findOrCreate(tagName);
  return tag;
};

// Export
module.exports.findOrCreateTag = findOrCreateTag;
